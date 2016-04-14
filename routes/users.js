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
    }).returning('name')
    .then((response) => {
      res.json(response)
    })
    .catch(err =>{ next(new Error(err)) });
});

router.post('/login', (req, res, next) =>{
  let email = req.body.email,
      password  = req.body.password;
  if(!password || !email){
    res.json({error: 'No Input Provided'})
  } else {
    dt.Users()
      .where({email: email}).first()
      .then(user =>{
        if (!user){
          res.json({error: 'User Does Not Exists'})
        } else {
          res.json({
            user_id: user.user_id,
            user_name: user.name,
            user_email: user.email,
            user_admin: user.admin
          })
        }
      });
  }
});

module.exports = router;
