
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {user_id: 1, chatroom_id: 1, text: 'Yo'},
        {user_id: 2, chatroom_id: 1, text: 'Nothing much'},
        {user_id: 3, chatroom_id: 2, text: 'Anyone here?'}
      ]);
    });
};
