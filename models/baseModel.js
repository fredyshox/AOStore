//
//  models/baseModel.js
//  DB-Project
//
//  BaseModel class
//
//  Created by Kacper Raczy & Filip Klich on 15.01.2018.
//

class BaseModel {
  constructor(name) {
    this.name = name;
    this.initialize();
  }

  initialize() {}

  addConstraints() {}
}

module.exports = BaseModel;
