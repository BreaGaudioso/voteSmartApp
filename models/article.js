var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  headline: String,
  link: String,
  source: String,
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;