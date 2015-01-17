var mongoose = require('mongoose');
var schema = require("../../schemas/product/schema");

var model = mongoose.model("Product", schema, "productCollection");

module.exports = model;