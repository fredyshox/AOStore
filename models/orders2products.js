var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
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
                	\`quantity\` INT NOT NULL
            );`));
  console.log(name + " created")
})

Orders2Products.prototype.addConstraints = async(() => {
  await (db.query(`ALTER TABLE \`Orders2Products\`
                  ADD CONSTRAINT \`Orders2Products_fk0\`
                  FOREIGN KEY (\`productID\`) REFERENCES \`Products\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Orders2Products\`
                  ADD CONSTRAINT \`Orders2Products_fk1\`
                  FOREIGN KEY (\`orderID\`) REFERENCES \`Orders\`(\`ID\`);`));

  console.log(name + " constraints added");
})


module.exports = new Orders2Products();
