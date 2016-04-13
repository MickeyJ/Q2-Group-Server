
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table =>{
    table.increments('product_id');
    table.string('name');
    table.string('info');
    table.string('image_url');
    table.integer('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
