//
//  models/products.js
//  DB-Project
//
//  Product model class
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//


const db = require('../db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const BaseModel = require('./baseModel');
var fkConstraint = require('../db/util').fkConstraint;
var name = 'Product';

class Product extends BaseModel {
  constructor() {
    super(name);
  }
}

Product.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS  \`Products\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`name\` varchar(64) NOT NULL,
                	\`price\` DECIMAL(10,2) NOT NULL,
                	\`description\` varchar(512) NOT NULL,
                	\`quantity\` INT NOT NULL,
                	\`categoryID\` INT,
                	PRIMARY KEY (\`ID\`)
                );`))
  console.log(name + " created");
})

Product.prototype.addConstraints = async(() => {
  await (fkConstraint('Products_fk0', `ALTER TABLE \`Products\`
                                              ADD CONSTRAINT \`Products_fk0\`
                                              FOREIGN KEY (\`categoryID\`)
                                              REFERENCES \`ProductCategory\`(\`ID\`)
                                              ON DELETE SET NULL;`));
  console.log(name + " constraints added");
});

Product.prototype.products = (lastRow = 0, name = '', category = undefined) => {
  var queryFlag = false;
  var itemCount = 10;
  var querySql = `SELECT *
                  FROM \`Products\` p`

  if (name.length > 2) {
    var pattern = '%' + name + '%';
    querySql = querySql + ' WHERE p.name LIKE ?';
    querySql = db.format(querySql, [pattern]);
    queryFlag = true;
  }

  if(category) {
    if(queryFlag) {
      querySql = querySql + ' AND';
    }else {
      querySql = querySql + ' WHERE';
    }

    querySql = querySql + ' p.categoryID = ?'
    querySql = db.format(querySql, [category])
    queryFlag = true;
  }

  querySql = querySql + ' LIMIT ?,?';
  querySql = db.format(querySql, [lastRow, lastRow + itemCount]);

  return db.execute(querySql);
}

Product.prototype.random = () => {
  return db.execute(`SELECT * FROM \`Products\`
              ORDER BY RAND() LIMIT 5`);
}

Product.prototype.productWithID = (id) => {
  return db.execute(`SELECT *
                     FROM \`Products\` p
                     WHERE p.ID = ?`, [id]);
}

Product.prototype.isAvailable = (id) => {
  return db.execute('SELECT productIsAvailable(?);', [id]);
}

Product.prototype.add = (name, price, description, quantity, category) => {
  return db.execute(`INSERT INTO \`Products\` (name, price, description, quantity, categoryID)
                    VALUES (?, ?, ?, ?, ?);`, [name, price, description, quantity, category]);
};

Product.prototype.delete = (id) => {
  return db.execute(`DELETE FROM \`Products\`
                    WHERE ID = ?;`, [id]);
}

Product.prototype.rename = (id, name, price, description, quantity, category) => {
  return db.execute(`Update \`Products\`
                    SET name = ?, price=?, description=?, quantity=?, category=?
                    WHERE ID=?;`, [name, price, description, quantity, category, id]);
};


module.exports = new Product();
