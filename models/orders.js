var db = require('../db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const BaseModel = require('./baseModel');
var name = 'Order';

class Order extends BaseModel {
  constructor() {
    super(name);
  }
}

Order.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Orders\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`userID\` INT NOT NULL,
                	\`createdAt\` DATE NOT NULL,
                	\`confirmed\` BOOLEAN NOT NULL,
                	\`deliveryID\` INT NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  console.log(name + " created")
});


Order.prototype.addConstraints = async(() => {
  await (db.query(`ALTER TABLE \`Orders\`
                  ADD CONSTRAINT \`Orders_fk0\`
                  FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Orders\`
                  ADD CONSTRAINT \`Orders_fk1\`
                  FOREIGN KEY (\`deliveryID\`) REFERENCES \`Deliverer\`(\`ID\`);`));

  console.log(name + " constraints added");
});

module.exports = new Order();
