var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
var fkConstraint = require('../db/util').fkConstraint;

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

Category.prototype.categories = () => {
  return db.execute(`SELECT p.\`ID\`, p.\`name\`, c.\`ID\` as childID, c.\`name\` as childName
                    FROM \`ProductCategory\` p
                    LEFT JOIN \`ProductCategory\` c ON c.parentID = p.ID
                    WHERE p.\`parentID\` IS NULL;`);
};

Category.prototype.categoryWithID = (id) => {
  return db.execute(`SELECT *
                    FROM \`ProductCategory\` cat
                    WHERE cat.\`ID\` = ? ;`, [id]);
};

Category.prototype.add = (values) => {
  var keys = ['name', 'parentID'];

  var data = {};
  keys.forEach((key) => {
    data[key] = (values[key]) ? values[key] : null;
  });

  return db.query(`INSERT INTO \`ProductCategory\`
                     SET ? ;`, data);
};

Category.prototype.rename = (name, id) => {
  return db.execute(`Update \`ProductCategory\`
                  SET name = ?
                  WHERE ID = ?`, [name, id]);
};

Category.prototype.delete = (id) => {
  return db.execute(`DELETE FROM \`ProductCategory\`
                    WHERE ID = ?`, [id]);
};

module.exports = new Category();
