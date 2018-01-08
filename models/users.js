const db = require("../db");
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const BaseModel = require('./baseModel');
var name = 'User';

class User extends BaseModel {
  constructor() {
    super(name);
  }
}

User.prototype.initialize = async(() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Users\` (
            ID int NOT NULL AUTO_INCREMENT,
            email varchar(128),
            password varchar(256),
            permissions enum('user', 'mod', 'admin'),
            PRIMARY KEY(ID)
          );`));
  console.log(name + " created")
});

User.prototype.users = () => {
  return db.query(`SELECT * FROM \`Users\`;`);
};

User.prototype.userWithID = (id) => {
  return db.execute(`SELECT *
                     FROM \`Users\`
                     WHERE \`Users\`.ID = ?;`, [id]);
};

User.prototype.userWithEmail = (email) => {
  return db.execute(`SELECT *
                     FROM \`Users\`
                     WHERE \`Users\`.email = ?`, [email]);
}


module.exports = new User();
