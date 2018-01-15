var router = require('express').Router();
var render = require('../../util').render;
const ProductCategory = require('../../models').ProductCategory;

router.get('/', (req, res, next) => {
  ProductCategory.categories().then((fields) => {
    var result = fields[0]
    var categories = transformCategories(result);
    console.log(JSON.stringify(categories))

    req.template = {
      name: 'home',
      data: {
        categories: categories
      }
    }
    next();
  }).catch((err) => {
    console.log(err);
    res.redirect('/error');
  });
}, render)

var transformCategories = (data) => {
  var categories = {};
  data.forEach((element) => {
    if(!categories[element.ID]) {
      categories[element.ID] = {
        id: element.ID,
        name: element.name,
        children: []
      }
    }
    if(element.childID && element.childName) {
      categories[element.ID].children.push({
        id: element.childID,
        name: element.childName
      })
    }
  })

  return Object.values(categories);
}

module.exports = router;
