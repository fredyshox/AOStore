//
//  models/deliverer.js
//  DB-Project
//
//  Deliverer model class
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

var db = require('../db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const BaseModel = require('./baseModel');
var name = 'Deliverer';

class Deliverer extends BaseModel {
  constructor() {
    super(name);
  }
}

Deliverer.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Deliverer\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`name\` VARCHAR(16) NOT NULL,
                	\`price\` DECIMAL(10,2) NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  console.log(name + " created")
});

Deliverer.prototype.deliverers = () => {
  return db.execute(`SELECT *
                    FROM \`Deliverer\`;`);
};

Deliverer.prototype.delivererWithID = (id) => {
  return db.execute(`SELECT *
                     FROM \`Deliverer\` d
                     WHERE d.ID = ?`, [id]);
};

Deliverer.prototype.add = (name, price) => {
  return db.execute(`INSERT INTO \`Deliverer\` (name, price)
                     VALUES (?, ?);`, [name, price]);
};

Deliverer.prototype.delete = (id) => {
  return db.execute(`DELETE FROM \`Deliverer\`
                    WHERE ID = ?`, [id]);
};

module.exports = new Deliverer();
