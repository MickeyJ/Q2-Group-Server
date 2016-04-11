var express = require('express');
var router = express.Router();
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  res.json({singles: ['EMPTY']})
});

module.exports = router;
