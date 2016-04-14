var express = require('express');
var router = express.Router();
const dt = require('../db/tables');


router.get('/', (req, res, next) =>{
  dt.Orders()
    .innerJoin('users','orders.user_order_id','users.user_id')
    .innerJoin('products','orders.product_order_id','products.product_id')
    .then(orders =>{
      res.json(orders)
    });
});

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
    }).returning('order_id')
    .then(orderID =>{
      res.json(orderID)
    });
});

router.delete('/:userID/:productID', (req, res, next) =>{
  dt.Orders()
    .where({
      user_order_id: req.params.userID,
      product_order_id: req.params.productID
    })
    .del()
    .then(response =>{
      res.json(response)
    })
    .catch(err =>{ next(new Error(err)) });
});

module.exports = router;
