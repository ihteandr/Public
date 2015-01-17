var mongoose = require('mongoose');
var schema = require("../../schemas/nutritional/schema");

var model = mongoose.model("Nutritional", schema, "nutritionalCollection");

module.exports = model;