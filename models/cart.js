//
//  models/cart.js
//  DB-Project
//
//  Cart model class
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var fkConstraint = require('../db/util').fkConstraint;
var name = 'Cart';

class Cart extends BaseModel {
  constructor() {
    super(name);
  }
};

Cart.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Cart\` (
                	\`productID\` INT NOT NULL,
                	\`userID\` INT NOT NULL,
                	\`quantity\` INT NOT NULL,
                  PRIMARY KEY (\`userID\`,\`productID\`)
            );`));
  console.log(name + " created")
});

Cart.prototype.addConstraints = async(() => {
  await (fkConstraint('Cart_fk0', `ALTER TABLE \`Cart\`
                                  ADD CONSTRAINT \`Cart_fk0\`
                                  FOREIGN KEY (\`productID\`)
                                  REFERENCES \`Products\`(\`ID\`)`));

  await (fkConstraint('Cart_fk1', `ALTER TABLE \`Cart\`
                                  ADD CONSTRAINT \`Cart_fk1\`
                                  FOREIGN KEY (\`userID\`)
                                  REFERENCES \`Users\`(\`ID\`)`));
  console.log("Cart constraints added.");
});

Cart.prototype.cartForUser = (id) => {
  return db.execute(`SELECT c.quantity, p.ID, p.name, p.price
                    FROM \`Cart\` c
                    JOIN \`Products\` p ON c.productID = p.ID
                    WHERE c.userID = ? ;`, [id]);
};

Cart.prototype.addItem = (userID, productID, quantity) => {
  var obj = {
    userID: userID,
    productID: productID,
    quantity: quantity
  }

  return db.execute(`INSERT INTO \`Cart\`(\`productID\`,\`userID\`,\`quantity\`)
                     VALUES (?, ?, ?)
                     ON DUPLICATE KEY UPDATE \`quantity\`=\`quantity\`+1 ;`,
                     [productID, userID, quantity]);
};

Cart.prototype.deleteItem = (userID, productID) => {
  return db.execute(`DELETE FROM \`Cart\` c
                    WHERE c.userID = ? AND c.productID = ? ;`, [userID, productID]);
}

module.exports = new Cart();
