var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
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
                	\`quantity\` INT NOT NULL
            );`));
  console.log(name + " created")
});

Cart.prototype.addConstraints = async(() => {
  await (db.query(`ALTER TABLE \`Cart\` ADD CONSTRAINT \`Cart_fk0\` FOREIGN KEY (\`productID\`) REFERENCES \`Products\`(\`ID\`)`));

  await (db.query(`ALTER TABLE \`Cart\`
                              ADD CONSTRAINT \`Cart_fk1\`
                              FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`)`));
  console.log("Carts constraints added.");
});

module.exports = new Cart();
