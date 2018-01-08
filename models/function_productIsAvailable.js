var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'Product Is Available';
class ProductIsAvailable extends BaseModel {
  constructor() {
    super(name);
  }
};
ProductIsAvailable.prototype.initialize = async (() => {
  await (db.query(`DELIMITER $
                  CREATE FUNCTION IF NOT EXISTS\`productIsAvailable\`(IxD INT, num INT)
                  RETURNS BOOLEAN BEGIN
                  	IF (SELECT quantity FROM \`Products\` WHERE ID=ixD) >= num
                    THEN
                  		return true;
                  	ELSE
                  		return false;
                  	END IF;
                  END$
                  DELIMITER ;
            );`));
  console.log(name + " created")
})

ProductIsAvailable.prototype.productIsAvailable = (productID, quantity) => {
  return db.execute(`SELECT
                    \`productIsAvailable\`(?, ?);`, [productID], [quantity]);
}

initialize();


module.exports = new ProductIsAvailable();