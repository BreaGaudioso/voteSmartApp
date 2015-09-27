var db = require('../models/index');

// render signup page
app.get('/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/signup');
});

//signup user and log them in
app.post('/signup', function(req, res) {
  var newUser = req.body.user;
  console.log(newUser)
  db.User.create(newUser, function(err, user) {
    if(user) {
      req.login(user);
      console.log('user is ',user);
      res.redirect('/users/'+ req.session.id);
    } else {
      console.log(err);
      res.render('users/signup');
    }
  });
});

//LOGIN ROUTE
app.get('/login', routeMiddleware.preventLoginSignup, function(req, res) {
  res.render('users/login');
});

app.post('/login', function(req, res) {
  console.log('req.body.user: ', req.body.user);
  console.log('req.body.id: ', req.body.id);
  db.User.authenticate(req.body.user, function(err, user) {
    if(!err && user !== null) {
      req.login(user);
      res.redirect('/users/'+req.session.id);
    } else {
      res.render('users/login', console.log('Error'));
    }
  });
});

// show user
app.get('/users/:id',function(req,res){
  db.User.findById(req.params.id).populate('article').exec(function (err, user){
    console.log(user)
    res.render("users/index", {user:user});
  });
});


//LOGOUT
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
