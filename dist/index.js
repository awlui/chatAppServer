"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http_1 = require("http");
const routes_1 = require("./routes");
const sockets_1 = require("./sockets");
dotenv.config();
let app = express();
let server = new http_1.Server(app);
let io = sockets_1.socketServer(server);
// socketAuth(io, {
//   authenticate: function(socket, data, callback) {
//     console.log('authent process');
//     var username = data.username;
//     var password = data.password;
//     return callback(null, true);
//   }
// })
//  app.set('views', path.join(__dirname, 'views'));
//  app.engine('html', require('ejs').renderFile);
//  app.set("view engine", 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes_1.router);
server.listen(2000, () => {
    console.log("Server Running on port 2000");
});
