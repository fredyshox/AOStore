var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var name = 'User2Adress';

var initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`User2Adress\` (
              	\`userID\` INT NOT NULL,
              	\`firstName\` varchar(32) NOT NULL,
              	\`lastName\` varchar(32) NOT NULL,
              	\`phoneNo\` INT NOT NULL,
              	\`postalCode\` varchar(16) NOT NULL,
              	\`country\` varchar(32) NOT NULL,
              	\`province\` varchar(32) NOT NULL,
              	\`city\` varchar(32) NOT NULL,
              	\`street\` varchar(32) NOT NULL,
              	\`buildingNo\` varchar(8) NOT NULL,
              	\`flatNo\` INT NOT NULL
            );`));

  await (db.query(`ALTER TABLE \`User2Adress\`
                  ADD CONSTRAINT \`User2Adress_fk0\`
                  FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));
  console.log("User2Adress created")
})

initialize();


module.exports = {
  name
};