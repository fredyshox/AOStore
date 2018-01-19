//
//  controllers/routes/contact.js
//  DB-Project
//
//  Routes for contact.
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var router = require('express').Router();
var render = require('../../util').render;

router.get('/', (req, res, next) => {
  req.template = {
    name: 'contact',
    data: {}
  };
  next();
}, render);

module.exports = router;
