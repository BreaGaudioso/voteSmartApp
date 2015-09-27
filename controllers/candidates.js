var db = require('../models/index');
var request = require('request');

//index ~creates candidates based off of federal election comittee info, finds all and renders them onto the page 
app.get('/candidates', function (req,res){
  request.get ("https://api.open.fec.gov/v1/candidates/?api_key=5lzf0JBm7ZnNWBnotFuzWN5ReolEuwF7oSmeQGHf&page=1&per_page=100&candidate_status=C&cycle=2016&office=P&incumbent_challenge=O&year=2016&sort_nulls_large=true&sort=name", 
  function (err, response, body){
    if (err){
      console.log("err is", err)
    } 
    var data = JSON.parse(body);
    var candidates = data.results;
    candidates.forEach(function(c){
      db.Candidate.findOrCreate({name:c.name}, {name:c.name, party: c.party, partyFull: c.party_full, photo:"https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"} ,function(err, candidate, created) {
      });
    });
    db.Candidate.find({}, function (err, candidates){
      res.render('candidates/index', {candidates: candidates });
    });
  });
});

//shows candidate by id and queries the nty api search with their last name
app.get('/candidates/:id', function (req,res){
  db.Candidate.findById(req.params.id, function (err, candidate){
    var string= candidate.name;
    var sub= string.substring(0, string.indexOf(","));
    request.get ("http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+sub+"&fq=news_desk:('Politics')&fq=news_desk%3A+politics&sort=newest&api-key=8cdf7518fb5468a28778c0db8fe13d98:16:72963240", function (err, response, body){
      if (err){
        //change this
        console.log(err)
      } 
      var data = JSON.parse(body);
      var articles = data.response.docs;
      res.render('candidates/show', {candidate : candidate, articles: articles, session:req.session.id})
    });
  });
});


//edit this is just so i can add photos
app.get('/candidates/:id/edit', function (req,res){
  db.Candidate.findById(req.params.id, function (err, candidate){
    res.render('candidates/edit', {candidate : candidate})
  });
});

//update
app.put('/candidates/:id', function (req,res){
  db.Candidate.findByIdAndUpdate(req.params.id, { photo: req.body.photo} , function (err, candidate){
    if (err){
      res.render('candidates/edit')
    } else {
      res.redirect('/candidates/' + req.params.id);
    }
  });
});


