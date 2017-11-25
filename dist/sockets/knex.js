"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '192.168.99.100',
        user: 'root',
        password: 'password',
        database: 'wschat',
        charset: 'utf8',
    }
});
