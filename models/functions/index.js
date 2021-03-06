//
//  models/functions/index.js
//  DB-Project
//
//  Initialization script for sql functions and procedures.
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
var execMySQL = require('../../util').execMySQL;
const dir = path.join(__dirname, 'sql');

var options = {cwd: dir, shell: true};

fs.readdirSync(dir)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file != basename) && (file.slice(-4) === '.sql');
  })
  .forEach((file) => {
    execMySQL(file, options);
  });
