//
//  db/index.js
//  DB-Project
//
//  Responsible for initializing database connection
//
//  Created by Kacper Raczy & Filip Klich on 19.01.2018.
//

var config = require("../config").db;
const mysql = require("mysql2/promise");

var password = process.env.MYSQL_PASSWORD || 'password';
config.password = password;

const connection = mysql.createPool(config);

console.log("Connected to database with name: " + config.database);

module.exports = connection;
