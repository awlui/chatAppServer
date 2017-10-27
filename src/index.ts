import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { Server } from 'http';
import { router } from './routes';
let app = express();
let server = new Server(app);

let io = require('socket.io')(server);
 
 app.set('views', path.join(__dirname, 'views'));
 app.engine('html', require('ejs').renderFile);
 app.set("view engine", 'html');

 app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use(cookieParser());

 app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', router);

server.listen(2000, () => {
    console.log("Server Running on port 2000")
});