
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'awlui', first_name: 'andy', last_name: 'lui', password: 'password'},
        {id: 2, username: 'jlee', first_name: 'john', last_name: 'lee', password: 'secret'},
        {id: 3, username: 'mpan', first_name: 'mavis', last_name: 'pan', password: 'password3'}
      ]);
    });
};
