var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var name = 'Orders';

var initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Orders\` (
                	\`ID\` INT NOT NULL,
                	\`userID\` INT NOT NULL,
                	\`createdAt\` DATE NOT NULL,
                	\`confirmed\` BOOLEAN NOT NULL,
                	\`deliveryID\` INT NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  await (db.query(`ALTER TABLE \`Orders\`
                  ADD CONSTRAINT \`Orders_fk0\`
                  FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Orders\`
                  ADD CONSTRAINT \`Orders_fk0\`
                  FOREIGN KEY (\`deliveryID\`) REFERENCES \`Deliverer\`(\`ID\`);`));
  console.log("Carts created")
})

initialize();


module.exports = {
  name
};