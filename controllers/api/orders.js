var router = require('express').Router();
const Order = require('../../models').Order;

router.post('/', (req, res, next) => {
  var userID = req.user.id;
  console.log("Req body: " + JSON.stringify(req.body));
  Order.makeOrder(userID, req.body.deliveryID).then((fields) => {

    res.status(201).send('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).send('Error');
  });
});

module.exports = router;
