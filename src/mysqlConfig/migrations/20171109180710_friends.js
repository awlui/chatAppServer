
exports.up = function(knex, Promise) {
  return knex.schema
          .createTable('friends', function(table) {
            // table.increments('id').primary();
            table.integer('user_id').notNullable()
            table.integer('friend_id').notNullable()
            table.primary(['user_id', 'friend_id']);
          })

};

exports.down = function(knex, Promise) {
  return knex.schema
          .dropTableIfExists('friends')
};
