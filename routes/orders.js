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

router.post('/new', (req, res, next) =>{
  dt.Orders()
    .insert({
      user_order_id: req.body.user_id,
      product_order_id: req.body.product_id
    })
    .then(response =>{
      res.json(response)
    });
});

router.delete('/:user/:product', (req, res, next) =>{
  dt.Orders()
    .where({
      user_order_id: req.params.user,
      product_order_id: req.params.product
    })
    .del()
    .then(response =>{
      res.json(response)
    })
    .catch(err =>{ next(new Error(err)) });
});

module.exports = router;
