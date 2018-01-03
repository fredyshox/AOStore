var router = require('express').Router();

router.get("/", (req, res, next) => {
  res.render('cart', {items: [{name: "Mac", price: 9999, quantity: 2}]});
});


module.exports = router;
