var router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('orders', {orders: [{id: 0, createdAt: new Date(), confirmed: false, total:4499, delivery: {name: "DHL"}}]})
});

router.get('/data', (req, res, next) => {
  res.render('userdata', {});
});

router.get('/addaddress', (req, res, next) => {
  res.render('addaddress', {});
});


module.exports = router;
