//
//  controllers/api/users.js
//  DB-Project
//
//  REST Api for users.
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var router = require("express").Router();
const User = require("../../models/users");

router.get("/", (req, res) => {
  User.users().then((users) => {
    res.json(users[0]);
  }).catch((err) => {
    res.json(err);
  })
})

module.exports = router;
