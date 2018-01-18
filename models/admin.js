var db = require('../db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const BaseModel = require('./baseModel');
var name = 'AdminPanel';

class AdminPanel extends BaseModel {
  constructor() {
    super(name);
  }
}

AdminPanel.prototype.setPermission = (userID, perm) => {
  switch (perm) {
    case 0:
      return db.execute(`Update \`Users\`
                      SET permissions = 'user'
                      WHERE userID = ?`, [userID]);
    case 1:
      return db.execute(`Update \`Users\`
                      SET permissions = 'mod'
                      WHERE userID = ?`, [userID]);
    case 2:
      return db.execute(`Update \`Users\`
                        SET permissions = 'admin'
                        WHERE userID = ?`, [userID]);
  }
};

AdminPanel.prototype.addCategory = (newCategory, parentCategory) => {
  return db.execute(`INSERT INTO \`ProductCategory\` (name, parentID)
                        VALUES (?, ?);`, [newCategory, parentCategory]);
};
AdminPanel.prototype.addCategory = (newCategory) => { //when parent category is null
  return db.execute(`INSERT INTO \`ProductCategory\` (name)
                        VALUES (?);`, [newCategory]);
};
AdminPanel.prototype.renameCategory = (newCategory, oldCategory) => {
  return db.execute(`Update \`ProductCategory\`
                  SET name = ?
                  WHERE name = ?`, [newCategory, oldCategory]);
};
AdminPanel.prototype.removeCategory = (oldCategory) => {
  return db.execute(`DELETE FROM \`ProductCategory\`
                  WHERE name = ?`, [oldCategory]);
};
AdminPanel.prototype.addProduct = (name, price, description, quantity, category) => {
  return db.execute(`INSERT INTO \`Products\` (name, price, description, quantity, parentID)
                        VALUES (?, ?, ?, ?, ?);`, [name, price, description, quantity, category]);
};
AdminPanel.prototype.renameProduct = (id, name, price, description, quantity, category) => {
  return db.execute(`Update \`Products\`
                    SET name = ?, price=?, description=?, quantity=?, category=?
                    WHERE ID=?;`, [name, price, description, quantity, category, id]);
};
AdminPanel.prototype.addDeliverer = (newDev, price) => {
  return db.execute(`INSERT INTO \`Deliverer\` (name, price)
                        VALUES (?, ?);`, [newDev, price]);
};

AdminPanel.prototype.changePriceDeliverer = (deliverer, price) => {
  return db.execute(`Update \`Deliverer\`
                  SET price = ?
                  WHERE name = ?`, [price, deliverer]);
};
AdminPanel.prototype.removeDeliverer = (dev) => {
  return db.execute(`DELETE FROM \`Deliverer\`
                  WHERE name = ?`, [dev]);
};
AdminPanel.prototype.acceptOrder = (id) => {
  return db.execute(`Update \`Orders\`
                  SET confirmed = true
                  WHERE ID = ?`, [id]);
};
AdminPanel.prototype.discardOrder = (id) => {
  return db.execute(`DELETE FROM \`Orders\`
                  WHERE ID = ?`, [id]);
};

module.exports = new AdminPanel();