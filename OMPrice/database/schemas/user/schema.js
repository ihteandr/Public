var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

var schema = new Schema({
    hashedPassword: {type: String, required: true},
    username: {type: String, required: true, index: true},
    name: {type: String},
    email: {type: String},
    permissions: {type: Number, default: 0}
}, {autoIndex: false});

schema.methods.encrypt = function(data) {
    return crypto.createHmac('sha1', this.name).update(data).digest('hex');
};

schema.methods.checkPassword = function(password){
    return this.encrypt(password) === this.hashedPassword;
};


module.exports = schema;