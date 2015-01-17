var mongoose = require('mongoose');
var schema = require("../../schemas/family/schema");

var model = mongoose.model("Family", schema, "familyCollection");

module.exports = model;