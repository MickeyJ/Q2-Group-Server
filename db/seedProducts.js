'use strict';
const dt = require('./tables');
const products = require('./mockProducts');


console.log(products);

const seedProducts = () =>{
  dt.Products()
    .insert(products)
    .then(function(){

      process.exit(0);
    })
};

seedProducts();

