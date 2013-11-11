
exports.installDB = function(){
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/test');
    var Tradesman = require("./schemas/tradesman").schema;
    var Product = require("./schemas/product").schema;
    var Message = require("./schemas/message").schema;
    var User = require('./schemas/user').schema;
    mongoose.model("tradesman", Tradesman);
    mongoose.model("product", Product);
    mongoose.model("message", Message);
    mongoose.model("user", User);
}