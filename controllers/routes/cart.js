//
//  controllers/routes/cart.js
//  DB-Project
//
//  Routes for cart page.
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var router = require('express').Router();
const Cart = require('../../models').Cart;

var render = require('../../util').render;


router.get('/', (req, res, next) => {
  var userID = req.user.id;
  Cart.cartForUser(userID).then((result) => {
    var products = result[0];
    req.template = {
      name: 'cart',
      data: {
        items: products
      }
    }

    next();
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  })
}, render);


module.exports = router;
