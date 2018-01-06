var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var name = 'Reviews';

var initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Reviews\` (
                	\`ID\` INT NOT NULL,
                	\`userID\` INT NOT NULL,
                	\`productID\` INT NOT NULL,
                	\`stars\` INT(1) NOT NULL,
                	\`body\` varchar(512) NOT NULL,
                	\`createdAt\` DATE NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  await (db.query(`ALTER TABLE \`Reviews\`
                  ADD CONSTRAINT \`Reviews_fk0\`
                  FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Reviews\`
                  ADD CONSTRAINT \`Reviews_fk1\`
                  FOREIGN KEY (\`productID\`) REFERENCES \`Products\`(\`ID\`);`));
  console.log("Carts created")
})

initialize();


module.exports = {
  name
};