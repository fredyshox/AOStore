var router = require('express').Router();
const Product = require('../../models').Product;
const Cart = require('../../models').Cart;

var render = require('../../util').render;
var errorHandler = require('../../util').errorHandler;

router.get('/', (req, res, next) => {
  var lastRow = req.query.lastRow;
  var name = req.query.name;
  Product.products(lastRow, name).then((fields) => {
    var products = fields[0];
    req.template = {
      name: 'products',
      data: {
        products: products
      }
    }
    next();
  }).catch((err) => {
    console.log(err);
    errorHandler(req, res);
  });
}, render);

router.get('/:productID', (req, res, next) => {
  var productID = req.params.productID;
  Product.productWithID(productID).then((fields) => {
    var product = fields[0][0];
    req.template = {
      name: 'singleProduct',
      product: product
    }
    next();
  }).catch((err) => {
    console.log(err);
    errorHandler(req, res);
  })
}, render);

router.post('/:productID', (req, res, next) => {
  var productID = req.params.productID;
  Cart.addItem(req.user.id, productID, req.body.quantity).then((fields) => {
    //success
  }).catch((err) => {
    console.log(err);

  })
});

module.exports = router;
