var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var name = 'Cart';

var initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Cart\` (
                	\`productID\` INT NOT NULL,
                	\`userID\` INT NOT NULL,
                	\`quantity\` INT NOT NULL
            );`));
  await (db.query(`ALTER TABLE \`Cart\`
                  ADD CONSTRAINT \`Cart_fk0\`
                  FOREIGN KEY (\`productID\`) REFERENCES \`Products\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Cart\`
                  ADD CONSTRAINT \`Cart_fk1\`
                  FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));
  console.log("Carts created")
})

initialize();


module.exports = {
  name
};