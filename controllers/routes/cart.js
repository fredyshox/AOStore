var router = require('express').Router();
const Cart = require('../../models').Cart;

router.get('/', (req, res, next) => {
  var userID = req.auth.id;
  Cart.cartForUser(userID).then((result) => {
    var products = result[0];
    res.render('cart', {items: products});
  }).catch((err) => {
    res.status(400).json(err);
  })
});


module.exports = router;
