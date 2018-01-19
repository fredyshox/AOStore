var router = require('express').Router();
var render = require('../../util').render;
const Order = require('../../models').Order;

router.get('/', (req, res, next) => {
  res.redirect('/admin/permissions');
}, render);

router.get('/backup', (req, res, next) => {
  req.template = {
    name: 'adminBackup',
    data: {}
  }

  next();
}, render);

router.get('/permissions', (req, res, next) => {
  req.template = {
    name: 'adminPermissions',
    data: {}
  }

  next();
}, render);

router.get('/category', (req, res, next) => {
  req.template = {
    name: 'adminCategory',
    data: {}
  }

  next();
}, render);

router.get('/products', (req, res, next) => {
  req.template = {
    name: 'adminProducts',
    data: {}
  }

  next();
}, render);

router.get('/delivery', (req, res, next) => {
  req.template = {
    name: 'adminDelivery',
    data: {}
  }

  next();
}, render);

router.get('/orders', (req, res, next) => {
  Order.orders().then((result) => {
    var orders = result[0];
    req.template = {
      name: 'adminOrders',
      data: {
        orders: orders
      }
    }

    next();
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  })
}, render);

module.exports = router;
