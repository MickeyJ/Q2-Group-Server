
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', table =>{
    table.increments('order_id');
    table.integer('single_order_id').unsigned().references('single_id').inTable('singles');
    table.integer('user_order_id').unsigned().references('user_id').inTable('users');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
