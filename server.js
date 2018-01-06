var express = require('express');
var bodyParser = require("body-parser");
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

//api
app.use('/users', require('./controllers/api/users'));

//routes
app.use('/cart', require('./controllers/routes/cart'));
app.use('/account', require('./controllers/routes/account'));
app.use('/session', require('./controllers/routes/session'));
app.use('/products', require('./controllers/routes/products'));

app.get('/', function(req, res) {
  res.render('home', {categories: [{id:4, name:"Compyterrs"}]});
});


app.listen(port, function() {
  console.log("Server is running on port " + port);
});
