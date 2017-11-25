import * as socketio from 'socket.io';
import {todosWs} from './todos.ws';
import {auth} from './auth';
import {chatroomsWS} from './chatrooms.ws';
import * as socketAuth from 'socketio-auth';
import * as jwt from 'jsonwebtoken';
import {knex} from './knex';
export const socketServer = (server) => {
    let io = socketio(server);



    io.on('connection', (socket) => {
        // io.emit('message', {message: 'yo'})
        console.log('connection')
    });
    // let todos = todosWs(io);
    let authenticate = auth(io);
    let chatrooms = chatroomsWS(io);
}
