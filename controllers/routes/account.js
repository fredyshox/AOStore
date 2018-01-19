var router = require('express').Router();
const Order = require('../../models').Order;
const User2Address = require('../../models').User2Address;

var render = require('../../util').render;


router.get('/', (req, res, next) => {
  res.redirect('/account/orders');
})

router.get('/orders', (req, res, next) => {
  Order.ordersForUser(req.user.id).then((fields) => {
    var orders = fields[0];
    req.template = {
      name: 'orders',
      data: {
        orders: orders
      }
    }

    next();
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  });
}, render);


router.get('/data', (req, res, next) => {
  User2Address.addresses(req.user.id).then((fields) => {
    var addresses = fields[0];
    req.template = {
      name:'userdata',
      data: {
        addresses: boxTheAddresses(addresses)
      }
    }

    next();
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  });
}, render);

var boxTheAddresses = (addresses) => {
  var index = 0;
  var result = [];
  var box;
  var address;

  while(addresses[index]) {
    address = addresses[index];
    if(index % 3 === 0) {
      box = [];
      result.push(box);
    }

    box.push(address);
    index++;
  }

  return result;
}

router.get('/addaddress', (req, res, next) => {
  req.template = {
    name: 'addaddress',
    data: {}
  }

  next();
}, render);


module.exports = router;
