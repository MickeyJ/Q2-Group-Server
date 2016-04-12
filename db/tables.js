var knex = require('./knex');

exports.Users   = () => knex('users');
exports.Products = () => knex('products');
exports.Orders  = () => knex('orders');
