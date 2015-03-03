var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, index: true},
    id: {type: String, index: {unique: true}},
    market: {type: Schema.Types.ObjectId, ref:"Market"},
    section: {type: Schema.Types.ObjectId, ref:"Section"},
    category: {type: Schema.Types.ObjectId, ref:"Category"}
});

module.exports = schema;