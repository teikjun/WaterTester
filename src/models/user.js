//import node modules
const mongoose = require("mongoose");

//define a schema
const UserModelSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  adjective: String,
  color: String,
  liked_comments: Array
});

//compile a model from schema
module.exports = mongoose.model("UserModel", UserModelSchema);
