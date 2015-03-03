var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: "Brand"},
    manufacturer: {type: String},
    product: {type: Schema.Types.ObjectId, ref: "Product"},
    manufacturerCapacity: {type: String},
    bulk: {type: String},
    bulkUnit: {type: String},
    country: {type: Schema.Types.ObjectId, ref: "Country"},
    website: {type: String},
    phones: {type: String},
    email: {type: String},
    address: {type: String},
    summary: {type: String},
    consist: {type: String},
    nutritional: {type: Schema.Types.ObjectId, ref:"Nutritional"}
});

module.exports = schema;