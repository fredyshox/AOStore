var router = require('express').Router();
const Product = require('../../models').Product;

router.get('/', (req, res, next) => {
  var lastRow = req.query.lastRow;
  var name = req.query.name;
  Product.products(lastRow, name).then((fields) => {
    var products = fields[0];
    res.status(200).render('products', {products: products});
  }).catch((err) => {
    console.log(err);
    res.status(500).render('error', {error: err});
  });
});

router.get('/:productID', (req, res, next) => {
  var productID = req.params.productID;
  Product.productWithID(productID).then((fields) => {
    var product = fields[0][0];
    res.render('singleProduct', {product: product});
  }).catch((err) => {
    console.log(err);
    res.status(500).render('error', {error: err});
  })
});

module.exports = router;
