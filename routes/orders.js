var express = require('express');
var router = express.Router();
const dt = require('../db/tables');


router.get('/:id', (req, res, next) =>{
  const userID = req.params.id;
  console.log(userID);
  dt.Orders()
    .where({user_order_id: userID})
    .innerJoin('products','orders.product_order_id','products.product_id')
    .then(orders =>{
      res.json(orders)
    });
});

module.exports = router;
