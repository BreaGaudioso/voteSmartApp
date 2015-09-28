var db = require('../models/index');

//index of users articles
app.get('/users/:user_id/articles', routeMiddleware.ensureLoggedIn, function (req,res){
  console.log(req.session.id);
  db.Article.find({user:req.session.id}, function(err, articles){
    console.log(req.session.id);
    res.render('articles/index', {articles: articles, session:req.session.id})
  });
});


//add an article from candidate to your favorites
app.post("/users/:user_id/articles", routeMiddleware.ensureLoggedIn, function (req,res){
  console.log(req.session.id);
  db.Article.create({headline: req.body.headline, source: req.body.source, link: req.body.link}, function (err, article){
    if (err){
      throw err
    } else {
      db.User.findById(req.session.id, function(err, user) {
        user.articles.push(article);
        user.save();
        article.user = user._id;
        article.save();
      });
      res.redirect('/users/'+req.session.id +'/articles')
    };
  });
});


//render add your own article 
app.get('/users/:user_id/articles/new', routeMiddleware.ensureLoggedIn, function (req,res){
  console.log(req.session.id);
  res.render('articles/new', {session :req.session.id})
})

//create a new article in your favorites
app.post('/users/:user_id/articles', routeMiddleware.ensureCorrectUser, function (req,res){
  db.Article.create({headline: req.body.headline, source: req.body.source, link: req.body.link, user: req.session.id }, 
  function (err, article){
    if (err){
      res.render('articles/new')
    } else {
      db.User.findById(req.session.id, function(err, user) {
        user.articles.push(article);
        article.user = user._id;
        article.save();
        user.save();
      });
      res.redirect('/users/' + req.session.id + 'articles')
    };
  });
});

//search
app.get('/articles/search', function (req,res){
  res.render('articles/search');
});

//searchResults
app.get('/articles/results', function (req,res){
  var searchedFor = "2016" 
  var entered = encodeURIComponent(req.query.searchedFor);
  if (entered.length > 0){
    searchedFor = entered
  }
  var request = require('request');
  request.get ("http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchedFor+"&fq=news_desk:('Politics')&fq=news_desk%3A+politics&sort=newest&api-key=8cdf7518fb5468a28778c0db8fe13d98:16:72963240", function (err, response, body){
    if (err){
      console.log(err)
    } 
    var data = JSON.parse(body);
    var articles = data.response.docs;
    res.render("articles/results", {articles: articles, session:req.session.id})
  });
});


//delete article youve added 
app.delete('/users/:user_id/articles/:id', routeMiddleware.ensureLoggedIn, function (req,res){
  db.Article.findByIdAndRemove (req.params.id, function (err,article){
    if (err){
      res.render('articles/show');
    } else {
      res.redirect('/users/'+ req.session.id +'/articles');
    }
  });
});


