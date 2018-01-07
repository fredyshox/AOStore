const db = require("../db");
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
var models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file != basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    var model = require(path.join(__dirname, file));
    if (model.hasOwnProperty('name')) {
      models[model.name] = model;
    }
  });



module.exports = models;
