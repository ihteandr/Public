var mongoose = require('mongoose');
var schema = require("../../schemas/market/schema");

var model = mongoose.model("Market", schema, "marketCollection");

module.exports = model;