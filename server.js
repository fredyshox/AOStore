var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var hbs = require('express-handlebars');
var path = require('path');
var port = 1337;

var app = express();

//view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
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
app.use('/login', require('./controllers/routes/login'));
app.use('/products', require('./controllers/routes/products'));
app.use('/contact', require('./controllers/routes/contact'));

//home
app.use('/', require('./controllers/routes/home'));

//error
app.get('/error', require('./util').errorHandler);

//restricted routes
app.use(require('./auth').restrictAccess);
app.use('/cart', require('./controllers/routes/cart'));
app.use('/order', require('./controllers/routes/orders'));
app.use('/account', require('./controllers/routes/account'));

//restricted api
app.use('/api/address', require('./controllers/api/address'));
app.use('/api/orders', require('./controllers/api/orders'));

//admin restricted routes & api
app.use(require('./auth').restrictAdminAccess);
app.use('/admin', require('./controllers/routes/admin'));
app.use('/api/admin', require('./controllers/api/admin'));



app.listen(port, function() {
  console.log("Server is running on port " + port);
});
