var express = require("express");
var bodyParser = require("body-parser");
var port = 1337;

var app = express();
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.listen(port, function() {
  console.log("Server is running on port " + port);
});
