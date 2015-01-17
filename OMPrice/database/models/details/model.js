var mongoose = require('mongoose');
var schema = require("../../schemas/details/schema");

var model = mongoose.model("Details", schema, "detailsCollection");

module.exports = model;