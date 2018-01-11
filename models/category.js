var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
var fkConstraint = require('../scripts/util').fkConstraint;

const BaseModel = require("./baseModel");
var name = 'ProductCategory';

class Category extends BaseModel {
  constructor() {
    super(name);
  }
}

Category.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`ProductCategory\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`name\` varchar(32) NOT NULL,
                	\`parentID\` INT,
                	PRIMARY KEY (\`id\`)
            );`));
  await (fkConstraint('ProductCategory_fk0', `ALTER TABLE \`ProductCategory\`
                  ADD CONSTRAINT \`ProductCategory_fk0\`
                  FOREIGN KEY (\`parentID\`) REFERENCES \`ProductCategory\`(\`ID\`);`));
  console.log(name + " created")
})

//TODO
Category.prototype.categories = (children) => {
  if (children) {
    return db.execute(`SELECT *
                      FROM \`ProductCategory\` cat
                      WHERE cat.\`parentID\` = NULL;`);
  }else {

  }
};

Category.prototype.categoryWithID = (id) => {
  return db.execute(`SELECT *
                    FROM \`ProductCategory\` cat
                    WHERE cat.\`ID\` = ? ;`, [id]);
};


module.exports = new Category();
