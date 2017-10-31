import * as socketio from 'socket.io';
import {todosWs} from './todos.ws';
import * as socketAuth from 'socketio-auth';
export const socketServer = (server) => {
    let io = socketio(server);
 socketAuth(io, {
   authenticate: function(socket, data, callback) {
     console.log('authent process');
     var username = data.username;
     var password = data.password;
     
     return callback(null, {token: 5});
   }
 })
    io.on('connection', (socket) => {
        console.log('Connected')
    });
    let todos = todosWs(io);
}