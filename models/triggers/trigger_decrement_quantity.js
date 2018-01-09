var db = require('../../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('../baseModel');
var name = 'Decremet_Quantity';
class Decremet_Quantity extends BaseModel {
  constructor() {
    super(name);
  }
};

Decremet_Quantity.prototype.initialize = async (() => {
  await (db.query(`
                  DELIMITER |
                  CREATE TRIGGER \`Decremet_Quantity\` (
                  BEFORE insert ON \`Orders2Products\`
                 	FOR EACH ROW
                  BEGIN
                 		UPDATE Products
                 			SET quantity = quantity - NEW.quantity
                             WHERE ID=NEW.productID;
                  END |
                  DELIMITER ;`));
  console.log(name + " created")
});

module.exports = new Decremet_Quantity();
