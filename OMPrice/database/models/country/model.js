var mongoose = require('mongoose');
var schema = require("../../schemas/country/schema");

var model = mongoose.model("Country", schema, "countryCollection");

module.exports = model;