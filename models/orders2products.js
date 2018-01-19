//
//  models/orders2products.js
//  DB-Project
//
//  Order2Products model class
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
var fkConstraint = require('../db/util').fkConstraint;
const BaseModel = require('./baseModel');
var name = 'Orders2Products';

class Orders2Products extends BaseModel {
  constructor() {
    super(name);
  }
}

Orders2Products.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Orders2Products\` (
                	\`productID\` INT NOT NULL,
                	\`orderID\` INT NOT NULL,
                	\`quantity\` INT NOT NULL,
                  PRIMARY KEY(\`orderID\`, \`productID\`)
            );`));
  console.log(name + " created")
})

Orders2Products.prototype.addConstraints = async(() => {
  await (fkConstraint('Orders2Products_fk0', `ALTER TABLE \`Orders2Products\`
                                              ADD CONSTRAINT \`Orders2Products_fk0\`
                                              FOREIGN KEY (\`productID\`)
                                              REFERENCES \`Products\`(\`ID\`)
                                              ON DELETE CASCADE;`));

  await (fkConstraint('Orders2Products_fk1' ,`ALTER TABLE \`Orders2Products\`
                                              ADD CONSTRAINT \`Orders2Products_fk1\`
                                              FOREIGN KEY (\`orderID\`)
                                              REFERENCES \`Orders\`(\`ID\`)
                                              ON DELETE CASCADE;`));

  console.log(name + " constraints added");
})


module.exports = new Orders2Products();
