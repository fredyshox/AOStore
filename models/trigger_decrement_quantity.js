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
  await (db.query(`CREATE TRIGGER IF NOT EXISTS \`Decremet_Quantity\` (
                  BEFORE insert ON \`Orders2Products\`
                 	FOR EACH ROW BEGIN
                 		UPDATE Products
                 			SET quantity = quantity -NEW.quantity
                             WHERE ID=NEW.productID;
            );`));
  console.log(name + " created")
})

initialize();


module.exports = new Decremet_Quantity();