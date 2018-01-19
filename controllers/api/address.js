//
//  controllers/api/address.js
//  DB-Project
//
//  REST Api for address management
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

var router = require('express').Router();
const User2Address = require('../../models').User2Address;

//api
router.post('/add', (req, res, next) => {
  var bodyValues = Object.assign({}, req.body);
  User2Address.addAddress(req.user.id, bodyValues).then((fields) => {
    res.status(201).json('Created');
  }).catch((err) => {
    console.log('error');
    console.log(err);
    res.status(400).send(err);
  })
});

//api
router.post('/rm', (req, res, next) => {
  var id = req.body.id;
  User2Address.delete(id, req.user.id).then((fields) => {
    res.status(201).json('Removed');
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
});

module.exports = router;
