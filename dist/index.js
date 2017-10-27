"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http_1 = require("http");
const routes_1 = require("./routes");
let app = express();
let server = new http_1.Server(app);
let io = require('socket.io')(server);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes_1.router);
server.listen(2000, () => {
    console.log("Server Running on port 2000");
});
