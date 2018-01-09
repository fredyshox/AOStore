var jwt = require('jsonwebtoken');
var secret = require('./config').secret;
var cookieName = 'token'

var expireTime = 3600 * 24 * 7;

var createToken = (auth) => {
  var token = jwt.sign({
    id: auth.ID,
    permissions: auth.permissions
  },secret, {
    expiresIn: expireTime
  })

  return token;
};

module.exports.generateToken = (req, res, next) => {
  req.token = createToken(req.user);
  next();
};

module.exports.applyToken = function(req, res, next) {
  res.cookie(cookieName, req.token);
  next()
};


module.exports.authenticate = (req, res, next) => {
  var token = req.cookies[cookieName];
  console.log("token: " + token);
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (!err && decoded) {
        console.log("token valid")
        req.user = decoded;
      }else {
        console.log("token not valid");
      }
      next();
      //incompatible with api
      // else {
      //   res.status(401).send("Token not verified");
      // }
    });
  } else {
    console.log("No token");
    next();
    //res.status(403).send("Auth token not provided.");
  }
};

module.exports.clearAuth = (req, res, next) => {
  res.clearCookie(cookieName);
  next();
};
