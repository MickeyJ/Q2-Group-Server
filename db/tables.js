var knex = require('./knex');

exports.Users = () => knex('users');
exports.Singles = () => knex('singles');
exports.Orders = () => knex('orders');
