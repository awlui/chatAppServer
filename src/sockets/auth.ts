import * as jwt from 'jsonwebtoken';
import {knex} from './knex';
export let auth = function(io) {
  let auth = io.of('/auth');
  auth.on('connection', function(socket) {
    socket.on('authentication', (data: any) => {
      console.log('authing', data)
      if (data.token) {
        jwt.verify(data.token, 'secret', (err, decoded) => {
          if (err) {
            return socket.emit('unauthorized')
          }
          return socket.emit('authenticated', {token: data.token});
        });
      } else if (data.username && data.password) {
        console.log('hit')
          var username = data.username;
          var password = data.password;
          knex('users')
                 .where({username: username})
                 .select('password', 'id')
                 .then((results) => {
                   console.log(results, 'results')
                   if (!results[0]) {
                     console.log('hit!')
                     return socket.emit('unauthorized', 'unauthed');
                   }
                   else if (password == results[0].password) {
                     let token = jwt.sign({ user_id: results[0].id }, 'secret');
                     console.log(token, 'token')
                     return socket.emit('authenticated', {token});
                   }
                   else {
                     return socket.emit('unauthorized');
                   }
                 })
        } else {
          return socket.emit('unauthorized');
        }
    })
  })
}
