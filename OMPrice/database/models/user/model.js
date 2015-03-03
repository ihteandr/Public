var mongoose = require('mongoose');
var schema = require("../../schemas/user/schema");
console.log()
var model = mongoose.model("User", schema, "userCollection");

module.exports = model;