"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const todos_ws_1 = require("./todos.ws");
const socketAuth = require("socketio-auth");
exports.socketServer = (server) => {
    let io = socketio(server);
    socketAuth(io, {
        authenticate: function (socket, data, callback) {
            console.log('authent process');
            var username = data.username;
            var password = data.password;
            return callback(null, { token: 5 });
        }
    });
    io.on('connection', (socket) => {
        console.log('Connected');
    });
    let todos = todos_ws_1.todosWs(io);
};
