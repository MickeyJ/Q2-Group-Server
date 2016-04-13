var knex = require('./knex');

exports.Users    = () => knex('users');
exports.Admins   = () => knex('admins');
exports.Products = () => knex('products');
exports.Orders   = () => knex('orders');
