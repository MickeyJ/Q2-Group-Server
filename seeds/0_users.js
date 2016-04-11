'use strict';
const Faker = require('faker');
const bcrypt = require('bcrypt');

let fakeUsers = [];
exports.seed = function(knex, Promise) {
    for (var i = 1; i <= 20; i++) {
      const name = Faker.name.firstName();
      const email = Faker.internet.email();
      let password = bcrypt.hashSync(Faker.internet.password(), 10);
      fakeUsers.push({
        name,
        email,
        password
      })
    }
    return Promise.join (
      knex('users').del(),
      knex('users')
        .insert(fakeUsers)
        .then(function(){
          process.exit(0);
        })
    )
};


