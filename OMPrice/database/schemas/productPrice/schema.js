var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: "Product"},
    price: {type: Number},
    priceUnit: {type: String, default: "грв"},
    shop: {type: Schema.Types.ObjectId, ref: "Shop"}
});

module.exports = schema;