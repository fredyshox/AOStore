const db = require("../db");
const async = require("asyncawait/async");
const await = require("asyncawait/await");

var initialize = async(() => {
  await(db.query(`CREATE TABLE IF NOT EXISTS \`Users\` (
            ID int NOT NULL AUTO_INCREMENT,
            email varchar(128),
            password varchar(256),
            permissions enum('user', 'mod', 'admin'),
            PRIMARY KEY(ID)
          );`));
  console.log("Users created");
});

initialize();

var users = () => {
  return db.query(`SELECT * FROM \`Users\`;`);
};

var userWithID = (id) => {
  return db.execute(`SELECT *
                     FROM \`Users\`
<<<<<<< HEAD
                     WHERE \`Users\`.ID = ?;`, [id]);
=======
                     WHERE Users.ID = ?;`, [id]);
>>>>>>> 5cc2946accd54296947a9f44f333d3052373a688
};


module.exports = { users, userWithID };
