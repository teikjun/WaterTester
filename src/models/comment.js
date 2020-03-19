// import node modules
const mongoose = require("mongoose");

// define a schema
const CommentModelSchema = new mongoose.Schema({
  creator_id: String,
  creator_alias: String,
  creator_color: String,
  timestamp: Date,
  body: String,
  yes_or_no: String,
  votes: Number,
  parent_id: String
});

// compile model from schema
module.exports = mongoose.model("CommentModel", CommentModelSchema);
