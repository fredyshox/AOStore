var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
var fkConstraint = require('../scripts/util').fkConstraint;

const BaseModel = require('./baseModel');
var name = 'User2Address';

class User2Address extends BaseModel {
  constructor() {
    super(name);
  }
}

User2Address.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`User2Address\` (
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
  console.log(name + " created")
})

User2Address.prototype.addConstraints = async(() => {
  await (fkConstraint('User2Address_fk0', `ALTER TABLE \`User2Address\`
                                          ADD CONSTRAINT \`User2Address_fk0\`
                                          FOREIGN KEY (\`userID\`)
                                          REFERENCES \`Users\`(\`ID\`);`));

  console.log(name + " constraints added");
});

User2Address.prototype.addAddress = (uid, values) => {

}

User2Address.prototype.delete = (uid) => {
  //TODO
  return db.execute(`DELETE FROM \`User2Address\`
                    WHERE \`User2Address\`.\`user\``)
}

module.exports = new User2Address();
