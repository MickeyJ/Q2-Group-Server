
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table =>{
    table.increments('user_id');
    table.string('name');
    table.string('email');
    table.string('password');
    table.boolean('admin').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
