var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    networkCode: {type: String},
    cityCode: {type: String},
    districtCode: {type: String},
    miniDistrictCode: {type: String},
    code: {type: String},
    network: {type: String},
    address: {type: String},
    fullCode: {type: String, index: {unique: true}},
    name: {type: String, index: true},
    location: {
        latitude: {type: Number},
        longitude: {type: Number}
    }
});

module.exports = schema;