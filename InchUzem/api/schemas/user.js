var mongoose = require("mongoose");

var schema = {
    name: String,
    phone: String,
    email: String,
    respectLevel: Number,
    favorites: Array,
    likes: Array,
    uses: Array,
    login: String,
    password: String
};

var user = new mongoose.Schema(schema);

user.static("get", function(options, callback){
    var limit = options.limit || 50;
    var skip = options.skip || 0;

    if(options.likes){
        options.likes = { $elemMatch: options.likes };
    }
    if(options.favorites){
        options.favorites = { $elemMatch: options.favorites };
    }
    if(options.uses){
        options.uses = { $elemMatch: options.uses };
    }
    this.find(options).limit(limit).skip(skip).exec(callback);
})

user.static("search", function(options, callback){
    this.find({ name: /options.name/ }, callback);
})

exports.schema = user;