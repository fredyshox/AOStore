var config = require("../config").db;
const mysql = require("mysql2/promise");

var password = process.env.MYSQL_PASSWORD || 'password';
config.password = password;

const connection = mysql.createPool(config);

console.log("Connected to database with name: " + config.database);

module.exports = connection;
