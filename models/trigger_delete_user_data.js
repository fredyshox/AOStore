var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'Delete_User_Data';
class Delete_User_Data extends BaseModel {
  constructor() {
    super(name);
  }
};
Delete_User_Data.prototype.initialize = async (() => {
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


module.exports = new Delete_User_Data();