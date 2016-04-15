var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var admins = require('./routes/admins');
var products = require('./routes/products');
var orders = require('./routes/orders');
var passport = require('passport')

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'good secret',
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: 'localhost:3000/users/auth/google'}));

app.use('/', routes);
app.use('/users', users);
app.use('/admins', admins);
app.use('/products', products);
app.use('/orders', orders);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
