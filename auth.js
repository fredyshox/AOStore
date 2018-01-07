var jwt = require('jsonwebtoken');
var secret = require("./config").secret;

var expireTime = 3600 * 24 * 7;

var createToken = (auth) => {
  var token = jwt.sign({
    id: auth.id,
    permissions: auth.permissions
  },secret, {
    expiresIn: expireTime
  })

  return token;
};

module.exports.generateToken = function(req, res, next) {
  req.token = createToken(req.user);
  next();
};

module.exports.applyToken = function(req, res) {
  res.setHeader('x-auth', req.token);
  //page rendering
  next()
};


module.exports.authenticate = function (req, res, next) {
  if (req.headers["x-auth"]) {
    jwt.verify(req.headers["x-auth"], config.secret, function(err, decoded) {
      if (!err && decoded) {
        req.auth = decoded;
        next();
      }else {
        res.send(401);
      }
    });
  } else {
    res.status(403).send("Auth token not provided.");
  }
};
