
exports.up = function(knex, Promise) {
  return knex.schema
          .createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username', 15).notNullable();
            table.string('first_name', 15).notNullable();
            table.string('last_name', 15).notNullable();
            table.string('password').notNullable();

          }).createTable('chatrooms', function(table) {
            table.increments('id').primary();
            table.string('room_name', 15);

          });

};

exports.down = function(knex, Promise) {
  return knex.schema
          .dropTableIfExists('users')
          .dropTableIfExists('chatrooms');

};
