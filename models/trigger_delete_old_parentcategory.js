var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'Delte_Old_ParentCategory';
class Delte_Old_ParentCategory extends BaseModel {
  constructor() {
    super(name);
  }
};
Decremet_Quantity.prototype.initialize = async (() => {
  await (db.query(`CREATE TRIGGER IF NOT EXISTS \`Delte_Old_ParentCategory\`
                        BEFORE delete ON \`ProductCategory\`
                        	FOR EACH ROW BEGIN
                        		UPDATE \`ProductCategory\`
                        			SET parentID = OLD.parentID
                                    WHERE parentID=OLD.ID;
            );`));
  console.log(name + " created")
})

initialize();


module.exports = new Delte_Old_ParentCategory();