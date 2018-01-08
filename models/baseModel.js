class BaseModel {
  constructor(name) {
    this.name = name;
    this.initialize();
  }

  initialize() {}
  
  addConstraints() {}
}

module.exports = BaseModel;
