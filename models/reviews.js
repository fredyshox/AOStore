var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'Review';

class Review extends BaseModel {
  constructor() {
    super(name);
  }
}

Review.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Reviews\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`userID\` INT NOT NULL,
                	\`productID\` INT NOT NULL,
                	\`stars\` INT(1) NOT NULL,
                	\`body\` varchar(512) NOT NULL,
                	\`createdAt\` DATE NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  console.log(name + " created")
})

Review.prototype.addConstraints = async(() => {
  await (db.query(`ALTER TABLE \`Reviews\`
                  ADD CONSTRAINT \`Reviews_fk0\`
                  FOREIGN KEY (\`userID\`) REFERENCES \`Users\`(\`ID\`);`));

  await (db.query(`ALTER TABLE \`Reviews\`
                  ADD CONSTRAINT \`Reviews_fk1\`
                  FOREIGN KEY (\`productID\`) REFERENCES \`Products\`(\`ID\`);`));

  console.log(name + " constraints added");
})


module.exports = new Review();
