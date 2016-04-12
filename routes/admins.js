'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const valid = require('../util/valid');
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  dt.Admins()
    .orderBy('admin_id')
    .then(function(admins){
      res.json(admins);
    });
});

router.post('/signup', (req, res, next) =>{
  res.json('WIP')
});

router.post('/login', (req, res, next) =>{
  res.json('WIP')
});

module.exports = router;
