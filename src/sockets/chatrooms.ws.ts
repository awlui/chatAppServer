import { chatroomsDB } from './chatrooms.mysql';
import * as jwt from 'jsonwebtoken';
import {knex} from './knex';
export let chatroomsWS = function(io) {
    let chatrooms = io.of('/chatrooms');
    chatrooms.on('connection', function(socket) {

      socket.on('joinRooms', (payload) => {
        jwt.verify(payload.token, 'secret', (err, decoded) => {
          if (err) {
            return socket.emit('unauthorized')
          }
          chatroomsDB.joinRooms(socket, decoded.user_id);
        });
      });

      socket.on('message', function(payload) {
        jwt.verify(payload.token, 'secret', (err, decoded) => {
          if (err) {
            return socket.emit('unauthorized')
          }
          chatroomsDB.saveMessage(decoded.user_id, payload, (err, res) => {
            if (err) {
               throw err
             }
            chatrooms.to(payload.data.chatroom_id).emit('message', payload.data);
          })
        });
      });
      socket.on('messages', function(payload) {

      });
      socket.on('createRoom', function(payload) {
        let room_name = payload.data.room_name ? payload.data.room_name : 'Unknown';
        if (room_name) {
          chatroomsDB.createRoom(room_name, (err, res) => {
            if (err) {
              throw err;
            }
            jwt.verify(payload.token, 'secret', (err, decoded) => {
              if (err) {
                return socket.emit('unauthorized')
              }
              chatroomsDB.joinRoom(res, decoded.user_id, () => {
                io.emit('message', 'room joined');
              });
            });
            io.emit('message', "room created");
          });
        }
      });

    });


}
