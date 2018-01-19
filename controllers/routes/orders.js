//
//  controllers/routes/orders.js
//  DB-Project
//
//  Routes for ordering things.
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var router = require('express').Router();
const Cart = require('../../models').Cart;
const User2Address = require('../../models').User2Address;
const Deliverer = require('../../models').Deliverer;
const Order = require('../../models').Order;

var render = require('../../util').render;

router.get('/', (req ,res ,next) => {
  Cart.cartForUser(req.user.id).then((fields) => {
    if (fields[0].length != 0) {
      return Deliverer.deliverers().then((fields) => {
        var deliverers = fields[0];
        return User2Address.addresses(req.user.id).then((fields) => {
          var addresses = fields[0];
          req.template = {
            name: 'delivery',
            data: {
              deliverers: deliverers,
              addresses: addresses,
              id: 6
            }
          }
          next();
        })
      })
    }else {
      res.redirect('/cart');
    }
  }).catch((err) => {
    res.redirect('/error');
  })
}, render);

module.exports = router;
