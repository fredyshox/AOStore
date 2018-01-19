//
//  controllers/routes/login.js
//  DB-Project
//
//  Routes for login page.
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var router = require('express').Router();
var clearAuth = require('../../auth').clearAuth;

router.get('/', (req, res, next) => {
  if (req.user) {
      res.redirect('/');
  }else {
      res.render('login', {});
  }
});

router.get('/signout', clearAuth, (req, res, next) => {
  res.redirect('/');
});

module.exports = router
