import * as socketio from 'socket.io';

export const socketServer = (server) => {
    let io = socketio(server);

    io.on('connection', (socket) => {

    });

}