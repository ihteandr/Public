var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    protein: {type: Number},
    fat: {type: Number},
    carbohydrates: {type: Number},
    caloric: {type: Number},
    product: {type: Schema.Types.ObjectId, ref: "Product"}
});

module.exports = schema;