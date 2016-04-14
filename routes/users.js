'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const valid = require('../util/valid');
const dt = require('../db/tables');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile.id, profile.name);
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  console.log('serialize user', user.emails[0]['value']);
  done(null, user.emails[0]['value']);
});

passport.deserializeUser(function(email, done) {
  // User.findById(id, function(err, user) {
    done({err: 'err'}, {email: email});
  // });
});


router.get('/', function(req, res, next) {
  dt.Users()
    .orderBy('user_id')
    .then(function(users){
      res.json(users);
    });
});

router.post('/signup', valid.Signup, (req, res, next) =>{
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  dt.Users()
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hash
    }).returning('name')
    .then((response) => {
      res.json(response)
    })
    .catch(err =>{ next(new Error(err)) });
});

router.post('/login', (req, res, next) =>{
  let email = req.body.email,
      password  = req.body.password;
  if(!password || !email){
    res.json({error: 'No Input Provided'})
  } else {
    dt.Users()
      .where({email: email}).first()
      .then(user =>{
        if (!user){
          res.json({error: 'User Does Not Exists'})
        } else {
          res.json({
            user_id: user.user_id,
            user_name: user.name,
            user_email: user.email,
            user_admin: user.admin
          })
        }
      });
  }
});

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    console.log(req.user);
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });


router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
