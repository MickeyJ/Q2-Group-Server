'use strict';
const EventEmitter = require('events').EventEmitter;
const Faker = require('faker');
const dt = require('./tables');
const bcrypt = require('bcrypt');


const seedUsers = (num) =>{
  const e = new EventEmitter();
  let fakeUsers = [];
  process.nextTick(() => {
    e.emit('start');
    for (var i = 1; i <= num; i++) {
      const name = Faker.name.firstName();
      const email = Faker.internet.email();
      e.emit('running', name);
      let password = bcrypt.hashSync(Faker.internet.password(), 10);
      fakeUsers.push({
        name,
        email,
        password
      })
    }
    return (
      dt.Users()
        .insert(fakeUsers)
        .then(function(){
          e.emit('end', num);
          process.exit(0);
        })
    )
  });
  return e
};

let seed = seedUsers(10);

seed.on('start',() =>{
  console.log('starting');
});
seed.on('running',(i) =>{
  console.log(`making person: ${i}`);
});
seed.on('end',(num) =>{
  console.log(`added ${num} users`);
});