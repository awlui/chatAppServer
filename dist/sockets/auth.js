"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const knex_1 = require("./knex");
exports.auth = function (io) {
    let auth = io.of('/auth');
    auth.on('connection', function (socket) {
        socket.on('authentication', (data) => {
            console.log('authing', data);
            if (data.token) {
                jwt.verify(data.token, 'secret', (err, decoded) => {
                    if (err) {
                        return socket.emit('unauthorized');
                    }
                    return socket.emit('authenticated', { token: data.token });
                });
            }
            else if (data.username && data.password) {
                console.log('hit');
                var username = data.username;
                var password = data.password;
                knex_1.knex('users')
                    .where({ username: username })
                    .select('password', 'id')
                    .then((results) => {
                    console.log(results, 'results');
                    if (!results[0]) {
                        console.log('hit!');
                        return socket.emit('unauthorized', 'unauthed');
                    }
                    else if (password == results[0].password) {
                        let token = jwt.sign({ user_id: results[0].id }, 'secret');
                        console.log(token, 'token');
                        return socket.emit('authenticated', { token });
                    }
                    else {
                        return socket.emit('unauthorized');
                    }
                });
            }
            else {
                return socket.emit('unauthorized');
            }
        });
    });
};
