var db = require('../models/index');

// render signup page
app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/signup');
});

//signup user and log them in
app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  db.User.create(newUser, function(err, user) {
    if(user) {
      req.login(user);
      res.redirect('/users/'+ req.session.id);
    } else {
      //change this
      console.log(err);
      res.render('users/signup');
    }
  });
});

//render login page
app.get('/login', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/login');
});

//login
app.post('/login', function(req, res) {
  db.User.authenticate(req.body.user, function(err, user) {
    if(!err && user !== null) {
      req.login(user);
      res.redirect('/users/'+req.session.id);
    } else {
      res.render('users/login', console.log('Error'));
    }
  });
});

// show user index page
app.get('/users/:id',function(req,res){
  db.User.findById(req.params.id).populate('article').exec(function (err, user){
    res.render("users/index", {user:user});
  });
});

//logout user 
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
