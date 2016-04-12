
exports.seed = function(knex, Promise) {
  const products = require('../assets/mockProducts');
  
  return Promise.join(
    knex('products').del(),
    knex('products').insert(products)
  );
};
