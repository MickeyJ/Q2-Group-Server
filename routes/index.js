var express = require('express');
var router = express.Router();
const url = require('url');

router.get('/', function(req, res, next) {
  res.json({
    users: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/users' }),
    admins: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/admins' }),
    products: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/products' }),
    products_by_id: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/products/12' }),
    orders: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/orders' }),
    order_by_id: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/orders/1' })
  })
});

module.exports = router;
