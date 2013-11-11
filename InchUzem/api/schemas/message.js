var mongoose = require("mongoose");

var schema = {
    text: String,
    who: String,
    whom: String,
    about: String
};

var message = new mongoose.Schema(schema);

message.static("get", function(options, callback){
    var limit = options.limit || 10;
    var skip = options.skip || 0;
    delete options.limit;
    delete options.skip;
    this.find(options).limit(limit).skip(skip).exec(callback)
})

message.static("search", function(options, callback){

})

exports.schema = message;