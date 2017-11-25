import {knex} from './knex';



export let chatroomsDB = {
    saveMessage: function(user_id, {data}, callback) {
      let message = data.message;
      let chatroom_id = data.chatroom_id;
      knex('users_chatrooms')
        .where({ user_id })
        .select('chatroom_id')
        .then((results) => {
          results.forEach((result) => {
            if (result.chatroom_id == chatroom_id) {
              console.log('hit2')
              knex('messages')
                .insert({
                  text: message,
                  chatroom_id,
                  user_id
                })
                .then((res) => {
                  console.log(res, '1')
                  callback(null, res);
                })
                .catch((err) => {
                  callback(err);
                })
            }
          })
        })


    },
    joinRooms: function(socket, user_id) {
      knex('users_chatrooms')
        .where({
          user_id
        })
        .select('chatroom_id')
        .then((results) => {
          results.forEach((result) => {
            socket.join(result.chatroom_id);
            socket.emit('message', `joined chatroom ${result.chatroom_id}`);
          })
        })
    },
    createRoom: function(room_name, callback) {
      console.log('creating room....')
      knex('chatrooms')
        .insert({
          room_name
        })
        .then(([res]) => {
          console.log(`Room: ${room_name} created`);
          callback(null, res);
        })
        .catch((err) => {
          console.log(err, 'err1');
          callback(err);
        })
    },
    joinRoom: function(chatroom_id, user_id, callback) {
      knex('users_chatrooms')
        .insert({
          user_id,
          chatroom_id
        })
        .then(([res]) => {
          console.log(`User added to room`)
          callback(null, res);
        })
        .catch((err) => {
          console.log(err, 'err1');
          callback(err);
        })
    }
}
