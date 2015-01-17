var mongoose = require('mongoose');
var schema = require("../../schemas/productPrice/schema");

var model = mongoose.model("ProductPrice", schema, "productPriceCollection");

module.exports = model;