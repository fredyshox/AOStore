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
