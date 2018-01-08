var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'CreateAcoount';
class SetAdress extends BaseModel {
  constructor() {
    super(name);
  }
};
SetAdress.prototype.initialize = async (() => {
  await (db.query(`DELIMITER $
                  CREATE PROCEDURE \`setAdress\`(
                  	ID Int,firstName VARCHAR(32), lastName VARCHAR(32), phoneNo INT, postalCode VARCHAR(16), country VARCHAR(32),
                      province varchar(32), city VARCHAR(32), street VARCHAR(32), buildingNo VARCHAR(8), flatNo INT
                  )
                  BEGIN
                  	IF (SELECT COUNT(userID) FROM User2Adress WHERE userID=ID)>0 THEN
                  		UPDATE User2Adress
                          SET User2Adress.firstName=firstName,User2Adress.lastName=lastName,User2Adress.phoneNo=phoneNo,User2Adress.postalCode=postalCode,
                  			User2Adress.country=country, User2Adress.province=province, User2Adress.city=city, User2Adress.street=street,
                              User2Adress.buildingNo=buildingNo, User2Adress.flatNo=flatNo
                          WHERE User2Adress.userID=ID;
                      ELSE
                  		INSERT INTO User2Adress (userID, firstName, lastName, phoneNo, postalCode, country, province, city, street, buildingNo, flatNo)
                  		VALUE (ID, firstName, lastName, phoneNo, postalCode, country, province, city, street, buildingNo, flatNo);
                      END IF;
                  END$
                  DELIMITER ;
            );`));
  console.log(name + " created")
})

SetAdress.prototype.setAdress = (
  userID, firstName, lastName, phoneNo, postalCode, country, province, city,
  street, buildingNo, flatNo
) => {
  return db.execute(
    `call aos_db.createAccount(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [userID], [firstName], [lastName], [phoneNo], [postalCode], [country], [province], [city], [street], [buildingNo], [flatNo]
  );
}

initialize();


module.exports = new SetAdress();