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

router.get('/:id', function(req, res, next) {
  dt.Products()
    .where({product_id: req.params.id})
    .first()
    .then(function(product){
      res.json(product);
    });
});

module.exports = router;
