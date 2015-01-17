var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String}
}, { autoIndex: false})