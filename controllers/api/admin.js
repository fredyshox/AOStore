//
//  controllers/api/admin.js
//  DB-Project
//
//  REST Api for admin actionss
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var router = require('express').Router();
const ProductCategory = require('../../models').ProductCategory;
const Product = require('../../models').Product;
const Deliverer = require('../../models').Deliverer;
const Order = require('../../models').Order;
const User = require('../../models').User;

router.post('/categories', (req, res, next) => {
  ProductCategory.add(req.body).then((result) => {
    res.status(201).json('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
});

router.post('/categories/:id', (req, res, next) => {
  var update = req.query.update;

  if(update) {
    renameCategory(req, res, next);
  }else {
    deleteCategory(req, res, next);
  }
});

var deleteCategory = (req, res, next) => {
  var id = req.params.id;
  ProductCategory.delete(id).then((result) => {
    res.status(201).json('Deleted');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
}

var renameCategory = (req, res, next) => {
  var id = req.params.id;
  ProductCategory.rename(req.body.name, id).then((result) => {
    res.status(201).json('Updated');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
};

router.post('/products', (req, res, next) => {
  Product.add(req.body.name, req.body.price, req.body.description, req.body.quantity, req.body.categoryID).then((result) => {
    res.status(201).json('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
});

router.post('/products/:id', (req, res, next) => {
  var id = req.params.id;
  Product.delete(id).then((result) => {
    res.status(201).json('Deleted');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
});

// var renameProduct = (req, res, next) => {
//   var id = req.params.id;
//   Product.rename(req.body.name, req.body.price, req.body.description, req.body.quantity )
// };

router.post('/deliverers', (req, res, next) => {
  Deliverer.add(req.body.name, req.body.price).then((result) => {
    res.status(201).json('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
});

router.post('/deliverers/:id', (req, res, next) => {
  var id = req.params.id;
  Deliverer.delete(id).then((result) => {
    res.status(201).json('Deleted');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
});

router.post('/orders/:id', (req, res, next) => {
  var confirm = req.query.confirm;

  if (confirm) {
    confirmOrder(req, res, next);
  }else {
    deleteOrder(req, res, next);
  }
});

var confirmOrder = (req, res, next) => {
  var id = req.params.id;
  Order.confirm(id).then((result) => {
    res.status(201).json('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
};

var deleteOrder = (req, res, next) => {
  var id = req.params.id;
  Order.delete(id).then((result) => {
    res.status(201).json('Deleted');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
};

router.post('/permissions/:userID', (req, res, next) => {
  var id = req.params.userID;
  User.grantPermissions(id, req.body.permissions).then((fields) => {
    res.status(201).json('Created');
  }).catch((err) => {
    console.log(err);
    res.status(400).json({error: err});
  });
});

module.exports = router;
