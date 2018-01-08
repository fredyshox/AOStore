var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'Decremet_Quantity';
class Decremet_Quantity extends BaseModel {
  constructor() {
    super(name);
  }
};
Decremet_Quantity.prototype.initialize = async (() => {
  await (db.query(`CREATE TRIGGER IF NOT EXISTS \`Delete_User_Data\`
                        BEFORE delete ON \`Users\`
                        	FOR EACH ROW BEGIN
                        		DELETE FROM \`User2Adress\`
                        			WHERE User2Adress.userID=old.ID;
                        		DELETE FROM \`Orders\`
                        			WHERE Orders.ID=old.ID;
            );`));
  console.log(name + " created")
})

initialize();


module.exports = new Decremet_Quantity();