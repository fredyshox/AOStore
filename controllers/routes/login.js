var router = require('express').Router();
var clearAuth = require('../../auth').clearAuth;

router.get('/', (req, res, next) => {
  res.render('login', {});
});

router.get('/signout', clearAuth, (req, res, next) => {
  res.redirect('/');
});

module.exports = router
