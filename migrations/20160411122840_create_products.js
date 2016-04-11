
exports.up = function(knex, Promise) {
  // return knex.schema.createTable('singles', table =>{
  //   table.increments('single_id');
  //   table.string('song');
  //   table.string('artist');
  //   table.string('info');
  //   table.string('image_url');
  //   table.integer('price');
  // })
};

exports.down = function(knex, Promise) {
  // return knex.schema.dropTable('singles');
};
