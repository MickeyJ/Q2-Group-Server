
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', table =>{
    table.increments('admin_id');
    table.string('name');
    table.string('email');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins');
};
