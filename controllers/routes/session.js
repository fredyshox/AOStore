var router = require('express').Router();
const User = require('../../models').User;
const bcrypt = require('bcrypt');
const auth = require('../../auth');
var config = require('../../config');

router.get('/', (req, res, next) => {
  res.render('login', {});
});

router.post('/authenticate', (req, res, next) => {
  User.userWithEmail(req.body.email).then((results) => {
    var user = results[0][0];
    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if(!valid) {
        res.status(403).send("Invalid password");
      }

      req.user = user;
      next()
    }).catch((err) => {
      res.status(403).send("Internal Error");
    })
  }).catch((err) => {
    res.status(403).send("Invalid user");
  });
}, auth.generateToken, auth.applyToken, signInSuccess);

var signInSuccess = (req, res, next) => {
  res.redirect('/');
};

router.post('/register', (req, res, next) => {
  //send token - route to home
});

module.exports = router
