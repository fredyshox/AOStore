var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var hbs = require('express-handlebars');
var path = require('path');
var port = 1337;

var app = express();

//view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layouts')}));
app.set('views', path.join(__dirname, 'views', 'templates'));
app.set('view engine', 'hbs');

//static files
app.use(express.static(path.join(__dirname, 'public')));

//additional setup
app.use(bodyParser.json());
app.use(cookieParser());

//api
app.use('/api/session', require('./controllers/api/session'));

//routes
app.use(require('./auth').authenticate);
app.use('/cart', require('./controllers/routes/cart'));
app.use('/account', require('./controllers/routes/account'));
app.use('/login', require('./controllers/routes/login'));
app.use('/products', require('./controllers/routes/products'));

app.get('/', function(req, res) {
  console.log(req.user);
  res.render('home', {user: req.user, categories: [{id:4, name:"Compyterrs"}]});
});


app.listen(port, function() {
  console.log("Server is running on port " + port);
});
