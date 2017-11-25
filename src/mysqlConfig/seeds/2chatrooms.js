
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chatrooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('chatrooms').insert([
        {id: 1, room_name: 'room1'},
        {id: 2, room_name: 'room2'},
        {id: 3, room_name: 'room3'}
      ]);
    });
};
