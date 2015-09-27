var express = require ('express');
app = express();
var ejs = require ('ejs');
var methodOverride = require ('method-override');
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');
var session = require('cookie-session');
findOrCreate = require('mongoose-findorcreate')
var bcrypt = require('bcrypt');
var request = require('request');
var u = require('underscore');
var db = require ('./models');
loginMiddleware = require("./middleware/loginHelper");
routeMiddleware = require("./middleware/routeHelper");
//use login middleware
app.use(session({
  maxAge: 3600000,
  secret: 'secret',
  name: "election"
}));

app.use(loginMiddleware);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
require('./controllers/index');

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
