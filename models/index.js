var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
const db = require('../db');
var models = {};

//create tables and import models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file != basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    var model = require(path.join(__dirname, file));
    if ('name' in model) {
      models[model.name] = model;
    }
  });

//constraints
for (var modelName in models) {
  var prop = models[modelName];
  if (typeof prop.addConstraints === 'function') {
    prop.addConstraints();
  }
}

//triggers
require('./triggers');

//functions
require('./functions');


module.exports = models;
