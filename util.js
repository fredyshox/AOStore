const { spawnSync } = require('child_process');
var config = require('./config');

var password = process.env.MYSQL_PASSWORD || 'password';
config.password = password;

var printMethods = (obj) => {
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        console.log(id + ": Function");
      }
    } catch (err) {
      console.log(id + ": inaccessible");
    }
  }
};


/**
Executes multiline sql from file using mysql shell command
@param file sql file name
@param options options passed to spawn func
*/
var execMySQL = (file, options) => {
  var execResult = spawnSync('mysql', ['-u', config.db.user, '-p' + config.db.password, config.db.database, '<' + file], options);
  if(execResult.status !== 0) {
    console.log('error: ' + file);
    console.log('err-msg: ' + execResult.stderr.toString());
  }else {
    console.log('success: ' + file);
  }
}

// express handlers

var errorHandler = (req, res) => {
  req.template = {
    name: 'error',
    data: {}
  }

  render(req, res);
}

var render = (req, res, next) => {
  var data = req.template.data;
  var name = req.template.name;
  data.user = req.user

  if (req.user) {
      data.adminPermissions = (req.user.permissions !== 'user')
  }

  res.render(name, data);
}

module.exports = { printMethods, execMySQL, render, errorHandler};
