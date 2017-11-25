
exports.up = function(knex, Promise) {
  return knex.schema
          .createTable('users_chatrooms', function(table) {
            // table.increments('id').primary();
            table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('chatroom_id').notNullable().unsigned().references('id').inTable('chatrooms').onDelete('CASCADE');
            table.timestamp( 'created_at' ).notNullable();
            table.primary(['user_id', 'chatroom_id']);
          })
          .createTable('messages', function(table) {
            table.increments().primary();
            table.integer('user_id').notNullable().unsigned().references('id').inTable('users');
            table.integer('chatroom_id').notNullable().unsigned().references('id').inTable('chatrooms').onDelete('CASCADE');
            table.text('text');
          })
};

exports.down = function(knex, Promise) {
  return knex.schema
          .dropTableIfExists('users_chatrooms')
          .dropTableIfExists('messages');
};
