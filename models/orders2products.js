var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var name = 'Orders2Products';

var initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Orders2Products\` (
                	\`productID\` INT NOT NULL,
                	\`orderID\` INT NOT NULL,
                	\`quantity\` INT NOT NULL,
                	PRIMARY KEY (\`id\`)
            );`));
  await (db.query(`ALTER TABLE \`Orders2Products\`
                  ADD CONSTRAINT \`Orders2Products_fk0\`
                  FOREIGN KEY (\`productID\`) REFERENCES \`Products\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Orders2Products\`
                  ADD CONSTRAINT \`Orders2Products_fk1\`
                  FOREIGN KEY (\`orderID\`) REFERENCES \`Orders\`(\`ID\`);`));
  console.log("Orders2Products created")
})

initialize();


module.exports = {
  name
};