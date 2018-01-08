var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'Make Order';
class MakeOrder extends BaseModel {
  constructor() {
    super(name);
  }
};
MakeOrder.prototype.initialize = async (() => {
  await (db.query(`DELIMITER $
                  CREATE PROCEDURE \`makeOrder\`(user INT,delivery INT)
                  BEGIN
                  	DECLARE \`OrderID\` INT;
                      SET \`OrderID\` = (Select max(ID) from Orders)+1;

                  	INSERT INTO \`Orders\` (ID,userID,createdAt,confirmed,deliveryID)
                  	value (OrderID,user,NOW(),false,delivery);

                  	INSERT INTO \`Orders2Products\` (productID, quantity, orderID)
                  	SELECT \`productID\`, \`quantity\`, \`OrderID\`
                  	FROM \`Cart\`
                  	WHERE Cart.userID=user;

                    DELETE FROM \`Cart\`
                  	WHERE Cart.userID=user;
                  END$
                  DELIMITER ;
            );`));
  console.log(name + " created")
})

MakeOrder.prototype.makeOrder = (userID, deliveryID) => {
  return db.execute(`call 4list.makeOrder(?, ?);`, [userID], [deliveryID]);
}

initialize();


module.exports = new MakeOrder();