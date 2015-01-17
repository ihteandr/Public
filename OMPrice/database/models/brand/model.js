var mongoose = require('mongoose');
var schema = require("../../schemas/brand/schema");

var model = mongoose.model("Brand", schema, "brandCollection");

module.exports = model;