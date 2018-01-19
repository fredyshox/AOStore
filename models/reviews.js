//
//  models/reviews.js
//  DB-Project
//
//  Review model class
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//


var db = require('../db');
const async = require("asyncawait/async");
const await = require("asyncawait/await");
var fkConstraint = require('../db/util').fkConstraint;

const BaseModel = require('./baseModel');
var name = 'Review';

class Review extends BaseModel {
  constructor() {
    super(name);
  }
}

Review.prototype.initialize = async (() => {
  await (db.query(`CREATE TABLE IF NOT EXISTS \`Reviews\` (
                	\`ID\` INT NOT NULL AUTO_INCREMENT,
                	\`userID\` INT NOT NULL,
                	\`productID\` INT NOT NULL,
                	\`stars\` INT(1) NOT NULL,
                	\`body\` varchar(512) NOT NULL,
                	\`createdAt\` DATE NOT NULL,
                	PRIMARY KEY (\`ID\`)
            );`));
  console.log(name + " created")
})

Review.prototype.addConstraints = async(() => {
  await (fkConstraint('Reviews_fk0', `ALTER TABLE \`Reviews\`
                                      ADD CONSTRAINT \`Reviews_fk0\`
                                      FOREIGN KEY (\`userID\`)
                                      REFERENCES \`Users\`(\`ID\`);`));

  await (fkConstraint('Reviews_fk1', `ALTER TABLE \`Reviews\`
                                      ADD CONSTRAINT \`Reviews_fk1\`
                                      FOREIGN KEY (\`productID\`)
                                      REFERENCES \`Products\`(\`ID\`);`));

  console.log(name + " constraints added");
})

Review.prototype.reviews = (productID) => {
  return db.execute(`SELECT *
                    FROM \`Reviews\` r
                    WHERE r.productID = ? ;`, [productID]);
};

Review.prototype.addReview = (userID, productID, stars, body) => {
  return db.execute(`INSERT INTO \`Reviews\`(userID, productID, stars, body, createdAt)
                    VALUES (?, ?, ?, ?, (SELECT NOW()));`, [userID, productID, stars, body]);
}

Review.prototype.removeReview = (id) => {
  return db.execute(`DELETE FROM \`Reviews\` r
                    WHERE r.ID = ? ;`, [id]);
}



module.exports = new Review();
