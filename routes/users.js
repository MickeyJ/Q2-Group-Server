var express = require('express');
var router = express.Router();
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  dt.Users()
    .orderBy('user_id')
    .then(function(users){
      res.json(users);
    });
});

module.exports = router;
