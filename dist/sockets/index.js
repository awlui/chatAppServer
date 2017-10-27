"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
exports.socketServer = (server) => {
    let io = socketio(server);
    io.on('connection', (socket) => {
    });
};
