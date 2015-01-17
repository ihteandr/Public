var mongoose = require('mongoose');
var schema = require("../../schemas/category/schema");

var model = mongoose.model("Category", schema, "categoryCollection");

module.exports = model;