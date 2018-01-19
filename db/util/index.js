//
//  db/util/index.js
//  DB-Project
//
//  Initializes mySQL helper procedures and returns js wrappers.
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
const dir = path.join(__dirname, 'sql');
const db = require('../../db');
var execMySQL = require('../../util').execMySQL;

var options = {cwd: dir, shell:true};



fs.readdirSync(path.join(__dirname, 'sql'))
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file.slice(-4) === '.sql');
  })
  .forEach((file) => {
    execMySQL(file,options);
  });

var fkConstraint = (name, stmt) => {
  return db.execute(`CALL constraint_if_not_exists(?, ?);`, [name, stmt]);
}

module.exports = { fkConstraint };
