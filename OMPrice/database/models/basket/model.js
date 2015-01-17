var mongoose = require('mongoose');
var schema = require("../../schemas/basket/schema");

var model = mongoose.model("Basket", schema, "basketCollection");

module.exports = model;