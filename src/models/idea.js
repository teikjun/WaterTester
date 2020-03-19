// import node modules
const mongoose = require("mongoose");

// define a schema
const IdeaModelSchema = new mongoose.Schema({
  creator_id: String,
  creator_alias: String,
  creator_color: String,
  timestamp: Date,
  categories: Array,
  title: String,
  body: String,
  active: Boolean,
  votes_yes: Number,
  votes_no: Number,
  final_comment: String,
  final_side: String
});

// compile model from schema
module.exports = mongoose.model("IdeaModel", IdeaModelSchema);
