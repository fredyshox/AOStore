var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'CreateAcoount';
class CreateAccount extends BaseModel {
  constructor() {
    super(name);
  }
};
CreateAccount.prototype.initialize = async (() => {
  await (db.query(`CREATE PROCEDURE \`createAccount\`(email varchar(128),password varchar(256))
                    BEGIN
                    	DECLARE \`IxD\` INT;
                        SET \`IxD\` = (SELECT MAX(\`ID\`) from \`Users\`)+1;
                        IF \`IxD\` is null THEN
                    		SET \`IxD\`=1;
                            END IF;
                    	INSERT INTO \`Users\` (ID,email, permissions, password)
                    	VALUE (IxD,email,'user',PASSWORD(password));
                    END$
                    DELIMITER ;
            );`));
  console.log(name + " created")
})

CreateAccount.prototype.createAccount = (email, password) => {
  return db.execute(`call aos_db.createAccount(?, ?);`, [email], [password]);
}

initialize();


module.exports = new CreateAccount();