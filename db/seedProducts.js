'use strict';
const dt = require('./tables');
const products = require('./../assets/mockProducts');

const seedProducts = () =>{
  console.log(products);
  dt.Products()
    .insert(products)
    .then(function(){
      process.exit(0);
    })
};
seedProducts();

