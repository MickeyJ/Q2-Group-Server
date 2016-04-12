'use strict';
const dt = require('../db/tables');

module.exports = {
  Signup: (req, res, next) =>{
    let name  = req.body.name,
        email = req.body.email,
        pass  = req.body.password;
    if(!pass || !email || !name){
      res.json({error: 'No Input Provided'})
    } else {
      dt.Users()
        .where({email: email}).first()
        .then(user =>{
          if (!user){
            next()
          } else {
            res.json({error: 'This Email Already Exists'})
          }
        });
    }
  },
  Login: (req, res, next) =>{
    let email = req.body.email,
        pass  = req.body.password;
    if(!pass || !email){
      res.json('No Input Provided')
    } else {
      dt.Users()
        .where({email: email}).first()
        .then(user =>{
          if (!user){
            res.json({error: 'User Does Not Exists'})
          } else {
            next()
          }
        });
    }
  }
};