"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatrooms_mysql_1 = require("./chatrooms.mysql");
const jwt = require("jsonwebtoken");
exports.chatroomsWS = function (io) {
    let chatrooms = io.of('/chatrooms');
    chatrooms.on('connection', function (socket) {
        socket.on('joinRooms', (payload) => {
            jwt.verify(payload.token, 'secret', (err, decoded) => {
                if (err) {
                    return socket.emit('unauthorized');
                }
                chatrooms_mysql_1.chatroomsDB.joinRooms(socket, decoded.user_id);
            });
        });
        socket.on('message', function (payload) {
            jwt.verify(payload.token, 'secret', (err, decoded) => {
                if (err) {
                    return socket.emit('unauthorized');
                }
                chatrooms_mysql_1.chatroomsDB.saveMessage(decoded.user_id, payload, (err, res) => {
                    if (err) {
                        throw err;
                    }
                    chatrooms.to(payload.data.chatroom_id).emit('message', payload.data);
                });
            });
        });
        socket.on('messages', function (payload) {
        });
        socket.on('createRoom', function (payload) {
            let room_name = payload.data.room_name ? payload.data.room_name : 'Unknown';
            if (room_name) {
                chatrooms_mysql_1.chatroomsDB.createRoom(room_name, (err, res) => {
                    if (err) {
                        throw err;
                    }
                    jwt.verify(payload.token, 'secret', (err, decoded) => {
                        if (err) {
                            return socket.emit('unauthorized');
                        }
                        chatrooms_mysql_1.chatroomsDB.joinRoom(res, decoded.user_id, () => {
                            io.emit('message', 'room joined');
                        });
                    });
                    io.emit('message', "room created");
                });
            }
        });
    });
};
