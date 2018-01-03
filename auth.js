var jwt = require('jsonwebtoken');
var secret = "ddddd";

var expireTime = 3600 * 24 * 7;

var createToken = (auth) => {
  var token = jwt.sign({
    id: auth.id,
    email: auth.email
  },secret, {
    expiresIn: expireTime
  })

  return token;
};

module.exports.generateToken = function(req, res, next) {
  req.token = createToken(req.user);
  next();
};

module.exports.sendToken = function(req, res) {
  res.setHeader('x-auth', req.token);
  //page rendering
  res.status(200).json(req.user);
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
