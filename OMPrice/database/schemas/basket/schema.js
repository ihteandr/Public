var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    items: {
        type: [{
            product: {type: Schema.Types.ObjectId, ref: "Product"},
            count: {type: Number}
        }],
        default: []
    }
});

module.exports = schema;