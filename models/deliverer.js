var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var name = 'Deliverer';

var initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Deliverer\` (
                	\`ID\` INT NOT NULL,
                	\`name\` VARCHAR(16) NOT NULL,
                	\`price\` FLOAT NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  console.log("Carts created")
})

initialize();


module.exports = {
  name
};