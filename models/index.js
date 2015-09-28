var mongoose = require('mongoose');

mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/votesmartapp");
module.exports.Article = require('./article');
module.exports.Candidate = require('./candidate');
module.exports.User = require('./user');