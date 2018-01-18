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
  if (token) {
    console.log("token: " + token);
    jwt.verify(token, secret, function(err, decoded) {
      if (!err && decoded) {
        req.user = decoded;
      }else {
        console.log("token not valid");
      }
      next();
    });
  } else {
    next();
  }
};

module.exports.restrictAccess = (req, res, next) => {
  if (req.user === undefined) {
    res.format({
      'text/html': () => {
        res.redirect('/login');
      },
      'application/json': () => {
        res.status(401).json({error: 'Unauthorized'});
      }
    })
  }else {
    console.log("user allowed to see page");
    next();
  }
}

module.exports.restrictAdminAccess = (req, res, next) => {
  if (req.user === undefined) {
    res.format({
      'text/html': () => {
        res.redirect('/login');
      },
      'application/json': () => {
        res.status(401).send("Unauthorized");
      }
    })
  }else if(req.user.permissions !== 'user') {
    next();
  }else {
    console.log("User not allowed to enter admin page: " + req.user.ID);
    res.format({
      'text/html': () => {
        res.redirect('/error');
      },
      'application/json': () => {
        res.status(401).send("Unauthorized");
      }
    })
  }
}

module.exports.clearAuth = (req, res, next) => {
  res.clearCookie(cookieName);
  next();
};
