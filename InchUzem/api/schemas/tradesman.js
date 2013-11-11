var mongoose = require("mongoose");
var schema = {
    name: String,
    services: Array,
    type: {
        name: String,
        subtypes: Array
    },
    description: String,
    location: {latitude: Number, longitude: Number},
    address: String,
    phone: String,
    website: String,
    proprietor: String,
    usePlan: String
};
var tradesman = new mongoose.Schema(schema);

tradesman.static("get", function(options, callback){
    var limit = options.limit || 15;
    var skip = options.skip || 0;
    delete options.limit;
    delete options.skip;
    if(options.services){
        options.services = { $elemMatch: options.services };
    }
    if(options.type){
        options["type.name"] = options.type;
    }
    this.find(options).limit(limit).skip(skip).exec(callback);
});

tradesman.static("search", function(options, callback){
    this.find({ name: /options.name/ }, callback);
})

exports.schema = tradesman;