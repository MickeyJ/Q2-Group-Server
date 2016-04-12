'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const valid = require('../util/valid');
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  dt.Users()
    .orderBy('user_id')
    .then(function(users){
      res.json(users);
    });
});

router.post('/signup', valid.Signup, (req, res, next) =>{
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  dt.Users()
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    .then((response) => {
      res.json(response)
    })
    .catch(err =>{ next(new Error(err)) });
});

router.post('/login', valid.Login, (req, res, next) =>{
  dt.Users()
    .where({email: req.body.email})
    .first()
    .then(user => {
      res.json(user)
    })
    .catch(err =>{ next(new Error(err)) });
});

module.exports = router;
