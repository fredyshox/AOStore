var router = require('express').Router();
const Cart = require('../../models').Cart;
const Order = require('../../models').Order;
var render = require('../../util').render;
var errorHandler = require('../../util').errorHandler;


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
    errorHandler(req, res);
  })
}, render);

router.post('/', (req, res, next) => {
  var userID = req.user.id;
  Order.makeOrder(userID, req.body.deliveryID).then((fields) => {
    req.teplate = {
      name: 'success',
      data: {}
    }
    next()
  }).catch((err) => {
    errorHandler(req, res);
  });
}, render);


module.exports = router;
