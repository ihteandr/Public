var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, index: true},
    id: {type: String, index: {unique: true}}
});

module.exports = schema;