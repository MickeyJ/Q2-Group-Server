exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', table =>{
    table.increments('order_id');
    table.integer('user_order_id').unsigned().references('user_id').inTable('users');
    table.integer('product_order_id').unsigned().references('product_id').inTable('products');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};