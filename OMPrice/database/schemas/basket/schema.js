var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    products: {type: [{type: Schema.Types.ObjectId, ref: "User"}], default: []}
});

module.exports = schema;