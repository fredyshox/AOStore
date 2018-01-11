const { spawnSync } = require('child_process');
var config = require('./config');

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

module.exports = { printMethods, execMySQL };
