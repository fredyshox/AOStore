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
                	\`price\` FLOAT NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  console.log(name + " created")
});

module.exports = new Deliverer();
