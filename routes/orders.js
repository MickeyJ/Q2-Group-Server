var express = require('express');
var router = express.Router();
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  res.json({orders: ['EMPTY']})
});

router.get('/:id', function(req, res, next) {
  res.json({order: ['EMPTY']})
});

module.exports = router;
