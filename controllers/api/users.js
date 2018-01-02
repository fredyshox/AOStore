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
