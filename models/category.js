var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require("./baseModel");
var name = 'ProductCategory';

class Category extends BaseModel {
  constructor() {
    super(name);
  }
}

Category.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`ProductCategory\` (
                	\`id\` INT NOT NULL AUTO_INCREMENT,
                	\`name\` varchar(32) NOT NULL,
                	\`parentID\` INT,
                	PRIMARY KEY (\`id\`)
            );`));
  await (db.query(`ALTER TABLE \`ProductCategory\`
                  ADD CONSTRAINT \`ProductCategory_fk0\`
                  FOREIGN KEY (\`parentID\`) REFERENCES \`ProductCategory\`(\`id\`);`));
  console.log(name + " created")
})


module.exports = new Category();
