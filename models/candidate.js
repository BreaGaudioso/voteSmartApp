var mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  partyFull: String,
  photo: String,
});

candidateSchema.plugin(findOrCreate);

var Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;