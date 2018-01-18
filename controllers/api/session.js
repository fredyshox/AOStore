var router = require('express').Router();
const User = require('../../models').User;
const bcrypt = require('bcrypt');
const auth = require('../../auth');
var config = require('../../config');


var signInSuccess = (req, res, next) => {
  res.status(201).json(req.user);
};

router.post('/authenticate', (req, res, next) => {
  User.userWithEmail(req.body.email).then((results) => {
    var user = results[0][0];
    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if(!valid) {
        res.status(403).json({error: "Invalid password"});
      }
      console.log(user);
      req.user = user;
      next()
    }).catch((err) => {
      res.status(403).json({error: "Internal Error"});
    })
  }).catch((err) => {
    res.status(403).json({error: "Invalid user"});
  });
}, auth.generateToken, auth.applyToken, signInSuccess);


router.post('/register', (req, res, next) => {
  console.log('register');
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.createUser(req.body.email, hash).then((results) => {
      req.user = {};
      next();
    }).catch((err) => {
      console.log(err);
      res.status(400).json({error: "Cannot create user"});
    })
  }).catch((err) => {
    console.log(err);
    res.status(403).json({error: "Internal Error"});
  })
}, signInSuccess);

module.exports = router;
