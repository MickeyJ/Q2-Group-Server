'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const valid = require('../util/valid');
const dt = require('../db/tables');

router.get('/', (req, res, next) =>{
  dt.Users()
    .where({admin: true})
    .then(function(admins){
      res.json(admins);
    });
});

router.post('/signup', valid.Signup, (req, res, next) =>{
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  dt.Users()
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      admin: true
    }).returning('user_id')
    .then((response) => {
      res.json(response)
    })
    .catch(err =>{ next(new Error(err)) });
});

module.exports = router;
