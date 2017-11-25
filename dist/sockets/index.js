"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const auth_1 = require("./auth");
const chatrooms_ws_1 = require("./chatrooms.ws");
exports.socketServer = (server) => {
    let io = socketio(server);
    io.on('connection', (socket) => {
        // io.emit('message', {message: 'yo'})
        console.log('connection');
    });
    // let todos = todosWs(io);
    let authenticate = auth_1.auth(io);
    let chatrooms = chatrooms_ws_1.chatroomsWS(io);
};
