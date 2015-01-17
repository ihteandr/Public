var mongoose = require('mongoose');
var schema = require("../../schemas/shop/schema");

var model = mongoose.model("Shop", schema, "shopCollection");

module.exports = model;