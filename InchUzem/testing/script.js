//How many
var COUNT_OF_USERS = 15;
var COUNT_OF_TRADESMEN = 3;
var COUNT_OF_MESSAGES = 15;
var COUNT_OF_PRODUCTS = 50;

var userMock = require("./mocks/user").mock;
var productMock = require("./mocks/product").mock;
var tradesmanMock = require("./mocks/tradesman").mock;
var messageMock = require("./mocks/message").mock;

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');


var tradesman = mongoose.model("tradesman", {});
var user = mongoose.model("user", {});
var product = mongoose.model("product", {});
var message = mongoose.model("message", {});

var tradesmenIds = [];
var messagesIds  = [];
var productsIds  = [];
var usersIds = [];

var cleanDB = function(){
    user.remove({}, function(err){
        if(!err){
            console.log("users db cleaned");
        } else {
            console.log("error with users db clean :", err);
        }
    })
    tradesman.remove({}, function(err){
        if(!err){
            console.log("tradesmen db cleaned");
        } else {
            console.log("error with tradesmen db clean :", err);
        }
    })
    product.remove({}, function(err){
        if(!err){
            console.log("products db cleaned");
        } else {
            console.log("error with products db clean :", err);
        }
    })
    message.remove({}, function(err){
        if(!err){
            console.log("messages db cleaned");
        } else {
            console.log("error with messages db clean :", err);
        }
    })
}

var registerMessages = function(callback){
    for(var i = 0; i < COUNT_OF_MESSAGES; i++){
        var mock = messageMock;
        var uIndex = 0;
        var pIndex = 0;
        var uMetric = COUNT_OF_USERS;
        var pMetric = COUNT_OF_PRODUCTS;
        var counter = (COUNT_OF_PRODUCTS * COUNT_OF_TRADESMEN) * COUNT_OF_USERS ;
        for(var ti = 0; ti < COUNT_OF_TRADESMEN; ti++){
            var u_position = uIndex
            for(var ui = uIndex; ui < u_position + uMetric; ui++){
                uIndex++;
                var p_position = pIndex;
                for(var pi = pIndex; pi < p_position + pMetric; pi++){
                    pIndex++;
                    mock.who = usersIds[ui] || null;
                    mock.whom = tradesmenIds[ti];
                    mock.about = productsIds[pi] || null;
                    (new user(mock)).save(function(err, model){
                        if(!err){
                            messagesIds.push(model._id);
                            console.log("counter : ", counter);
                            if(--counter == 0){
                                console.log("registered message count : ", messagesIds.length);
                                callback();
                            }
                        } else {
                            console.log("error with registering message : ", err);
                            cleanDB();
                        }
                    })
                }
            }
        }
    }
};

var registerUsers = function(callback){
    var counter = COUNT_OF_USERS;
    for(var i = 0; i < COUNT_OF_USERS; i++){
        var mock = userMock;
        for(var key in mock){
            if(typeof mock[key] == "string"){
                mock[key] += i;
            }
        }
        (new user(mock)).save(function(err, model){
            if(!err){
                usersIds.push(model._id);
                if(--counter == 0){
                    console.log("registered users count : ", usersIds.length);
                    registerMessages(callback);
                }
            } else {
                console.log("error with user registering : ", err);
                cleanDB();
            }
        })
    }
};

var registerProducts = function(callback){
    var pIndex = 0;
    var metric = COUNT_OF_PRODUCTS;
    var counter = COUNT_OF_PRODUCTS*COUNT_OF_TRADESMEN;
    for(var ti = 0; ti < COUNT_OF_TRADESMEN; ti++){
        var position = pIndex;
        for(var pi = pIndex; pi < position + metric; pi++){
            pIndex ++;
            var mock = productMock;
            for(var key in mock){
                mock[key] += pi; 
            }
            mock.vendor = tradesmenIds[ti];
            (new product(mock)).save(function(err, model){
                if(!err){
                    productsIds.push(model._id);
                    if(--counter == 0){
                        console.log("registered products count : ", productsIds.length);
                        registerUsers(callback);
                    }
                } else {
                    console.log("error with product registration : ", err);
                    cleanDB();
                }
            })
        }
    }
}

var registerTradesman = function(callback){
    var counter = COUNT_OF_TRADESMEN;
    for(var i = 0; i < COUNT_OF_TRADESMEN; i++){
        var mock = tradesmanMock;
        for(var key in mock){
            if(typeof mock[key] == "string"){
                mock[key] += i;
            }
        }
        (new tradesman(tradesmanMock)).save(function(err, model){
            if(!err){
                tradesmenIds.push(model._id);
                if(--counter == 0){
                    console.log("registered tradesmen count : ", tradesmenIds.length);
                    registerProducts(callback);
                }
            } else {
                console.log("error with registering tradesman : ", err);
                cleanDB();
            }
        });
    }
}

var initialize = function(callback){
    tradesman.remove({}, function(){
        user.remove({}, function(){
            message.remove({}, function(){
                product.remove({}, function(){
                    registerTradesman(callback);
                })
            })
        })
    });
}

var run = function(){
    var args = require("optimist").default("test", "all").argv;
    if(args.test == "server"){

    } else if(args.test == "api"){
        require("./api-tests");
    } else {

    }
}

initialize(run);