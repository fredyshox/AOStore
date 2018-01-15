var db = require('../db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const BaseModel = require('./baseModel');
var fkConstraint = require('../scripts/util').fkConstraint;
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
  await (fkConstraint('Orders_fk0', `ALTER TABLE \`Orders\`
                                    ADD CONSTRAINT \`Orders_fk0\`
                                    FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));

  await (fkConstraint('Orders_fk1', `ALTER TABLE \`Orders\`
                                    ADD CONSTRAINT \`Orders_fk1\`
                                    FOREIGN KEY (\`deliveryID\`) REFERENCES \`Deliverer\`(\`ID\`);`));

  console.log(name + " constraints added");
});

Order.prototype.makeOrder = (userID, deliveryID) => {
  return db.execute('CALL makeOrder(?, ?);', [userID, deliveryID]);
}

Order.prototype.calculateTotal = (orderID) => {
  return db.execute('SELECT calculateTotal(?);', [orderID]);
}

Order.prototype.orders = (userID) => {
  return db.execute(`SELECT o.ID, o.createdAt, o.confirmed, d.name as deliveryName, calculateTotal(o.ID) as total
                    FROM \`Orders\` o
                    JOIN \`Deliverer\` d ON o.deliveryID = d.ID
                    WHERE o.userID = ? ;`, [userID]);
}

Order.prototype.confirm = (id) => {
  return db.execute(`UPDATE \`Orders\` o
                    SET o.confirmed = TRUE
                    WHERE o.ID = ? ;`, [id]);
}

module.exports = new Order();
