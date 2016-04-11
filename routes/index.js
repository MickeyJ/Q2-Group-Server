var express = require('express');
var router = express.Router();
const url = require('url');

router.get('/', function(req, res, next) {
  res.json({
    users: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/users' }),
    singles: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/singles' }),
    orders: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/orders' }),
    order_by_id: url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/orders/1' })
  })
});

module.exports = router;
