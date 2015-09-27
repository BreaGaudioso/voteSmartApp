var db = require('../models/index');
require('./articles');
require('./candidates');
require('./users');

//homepage dependend upon logged in or not
app.get('/', function(req, res){
  if (typeof req.session.id == 'string'){
    res.redirect("/users/"+req.session.id)
  } else {
    res.render('index');
  };
});

//404
app.get('*', function(req, res) {
  res.render('404');
});
