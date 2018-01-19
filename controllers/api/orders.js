//
//  controllers/api/orders.js
//  DB-Project
//
//  REST Api for orders
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//


var router = require('express').Router();
const Order = require('../../models').Order;

router.post('/', (req, res, next) => {
  var userID = req.user.id;
  console.log("Req body: " + JSON.stringify(req.body));
  Order.makeOrder(userID, req.body.deliveryID).then((fields) => {

    res.status(201).json('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: 'Error'});
  });
});

module.exports = router;
