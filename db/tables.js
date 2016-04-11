var knex = require('./knex');

exports.Users = () => knex('users');
