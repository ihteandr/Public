var mongoose = require("mongoose");
var translator = require("../utils/translator");

var schema = {
    created: Number,
    valid: Number,
    name: String,
    description: String,
    images: Array,
    vendor: String,
    price: {
        value: Number,
        unit: String
    },
    vender: String,
    type: {
        name: String,
        subtypes: Array
    },
    creator: String
}

var product = new mongoose.Schema(schema);

product.static("get", function(options, callback){
    var limit = options.limit || 25;
    var skip = options.skip || 0;
    delete options.limit;
    delete options.skip;
    if(options.price){
        options["price.value"] = { $gt: options.price[0], $lt: options.price[1] || 10000000000 };
    }
    if(options.type){
        options["type.name"] = options.type;
        options["type.subtypes"] = options.type;
    }
    if(options.images){
        options.images = { $elemMatch: options.images }
    }
    this.find(options).limit(limit).skip(skip).exec(callback);
})

product.static("search", function(options, callback){
    var self = this;
    translator.translate(options.name, ["ru", "arm"], function(names){
        var result = [];
        var query = [];
        for(var i = 0; i < names.length; i++){
            query.push({ name: /names[i]/ })
        }
        self.find({ $or: query }, callback);
    });
});

exports.schema = product;