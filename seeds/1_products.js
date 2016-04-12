
exports.seed = function(knex, Promise) {
const products = require('../db/mockProducts');
  
  return Promise.join(
    knex('products').del(),
    knex('products').insert(products)
  );
};
