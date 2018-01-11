var router = require('express').Router();
const Order = require('../../models').Order;

var render = require('../../util').render;
var errorHandler = require('../../util').errorHandler;

router.get('/', (req, res, next) => {
  Order.orders(req.user.id).then((fields) => {
    var orders = fields[0];
    req.template = {
      name: 'orders',
      data: {
        orders: orders
      }
    }

    next();
  }).catch((err) => {
    console.log(err);
    errorHandler(req, res);
  });
}, render);

//TODO
router.get('/data', (req, res, next) => {
  req.template = {
    name:'userdata',
    data: {}
  }

  next();
}, render);

router.get('/addaddress', (req, res, next) => {
  req.template = {
    name: 'addaddress',
    data: {}
  }

  next();
}, render);

router.post('/addaddress', (req, res, next) => {
  errorHandler(req, res);
});

module.exports = router;
