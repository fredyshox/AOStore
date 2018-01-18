var router = require('express').Router();

router.get('/', (req, res, next) => {
  res.redirect('/admin/permissions');
});

router.get('/backup', (req, res, next) => {
  res.render('adminBackup', {});
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
  res.render('adminOrders', {orders: [{id: 4, confirmed: false}]});
});

module.exports = router;
