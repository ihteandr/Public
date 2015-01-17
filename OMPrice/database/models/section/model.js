var mongoose = require('mongoose');
var schema = require("../../schemas/section/schema");

var model = mongoose.model("Section", schema, "sectionCollection");

module.exports = model;