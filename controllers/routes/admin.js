var router = require('express').Router();

router.get('/backup', (req, res, next) => {
  res.render('admin', {});
});

router.get('/permissions', (req, res, next) => {
  res.render('adminPermissions', {});
});

router.get('/category', (req, res, next) => {
  res.render('adminCategory', {});
});

router.get('/products', (req, res, next) => {
  res.render('adminProducts', {});
});

router.get('/delivery', (req, res, next) => {
  res.render('adminDelivery', {});
});

router.get('/orders', (req, res, next) => {
  res.render('adminOrders', {});
});

module.exports = router;