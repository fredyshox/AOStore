var router = require('express').Router();
const Product = require('../../models').Product;
const Cart = require('../../models').Cart;

var render = require('../../util').render;

//auth
var restrictAccess = require('../../auth').restrictAccess;

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
    res.redirect('/error');
  });
}, render);

router.get('/:productID', (req, res, next) => {
  var productID = req.params.productID;
  Product.productWithID(productID).then((fields) => {
    var product = fields[0][0];
    req.template = {
      name: 'singleProduct',
      data: {
        product: product
      }
    }
    next();
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  })
}, render);

router.post('/:productID', restrictAccess, (req, res, next) => {
  var productID = req.params.productID;
  //quantity in body
  Cart.addItem(req.user.id, productID, 1).then((fields) => {
    res.redirect('/cart')
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  })
});

module.exports = router;
