var express = require('express');
var router = express.Router();
const dt = require('../db/tables');

router.get('/', function(req, res, next) {
  dt.Products()
    .orderBy('product_id')
    .then(function(products){
      res.json(products);
    });
});

module.exports = router;
