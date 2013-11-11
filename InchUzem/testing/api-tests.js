var request = require("request");
var _ = require("underscore");
var domain = "http://localhost:9999";

var userTests = function(){
    var getUsers = function(callback){
        request.get(domain + "/users", function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("get users test ok.");
                callback(JSON.parse(body).data);
            } else {
                console.log("error with get users : ");
                console.log("error : ", error);
                console.log("body  : ", body);
                callback(-1);
            }
        })
    }

    var getUserById = function(users, callback){
        var ids = _.map(users, function(user){ return user._id;});
        var counter = ids.length - 1;
        for(var i = 0; i < ids.length; i++){
            var data = {};
            request.get(domain + "/users/" + ids[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("get user by id test ok.")
                        callback(users);
                    }
                } else {
                    console.log("error with get user by id : ", error);
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var searchUserByName = function(users, callback){
        var names = _.map(users, function(user){return user.name;});
        var counter = names.length - 1;
        for(var i = 0; i < names.length; i++){
            var data = {};
            request.get(domain + "/users/search/" + names[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("search user by name test ok.")
                        callback(users);
                    }
                } else {
                    console.log("error with search user by name :");
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var getUserByProperty = function(users, properties, callback){
        callback(users);
        return;
        var p_counter = properties.length;
        for(var index = 0, property; property =  properties[index]; index++){
            var props = _.map(users, function(user){return user[property];});
            var counter = props.length;
            console.log("props : ", props);
            for(var i = 0; i < props.length; i++){
                var data = {};
                data[property] = props[i];
                request.get(domain + "/users", data, function(error, response, body){
                    if(!error && response.statusCode == 200){
                        console.log("counter : ", counter);
                        console.log("p_counter : ", p_counter);
                        if((--counter == 0) && (--p_counter == 0)){
                            console.log("get user by property test ok.");
                            callback(users);
                        }
                    } else {
                        console.log("error with get user by " + property + " : ");
                        console.log("error : ", error);
                        console.log("body  : ", body);
                        callback(-1);
                    }
                })
            }
        }
    }

    var createUser = function(callback){
        var user = require("./mocks/user").mock;
        request.post(domain + "/users", JSON.stringify(user), function(error, response, body){
            if(!error && response.statusCode == 201){
                console.log("create user test ok.")
                callback(JSON.parse(body));
            } else {
                console.log("error with create user : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var updateUser = function(user, callback){
        user.name += "test";
        request.put(domain + "/users/" + user._id, JSON.stringify(user), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("update user test ok.")
                callback(user);
            } else {
                console.log("error with update user : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var deleteUser = function(user, callback){
        request.del(domain + "/users/" + (user.id || user._id), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("delete user test ok.")
                callback(0);
            } else {
                console.log("error with delete user : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var run = function(){
        console.log("testing users api")
        console.log("testing get users...");
        getUsers(function(users){
            if(users == -1){
                console.log("test failed.");
                return;
            }
            console.log("testing get users by id...");
            getUserById(users,function(users){
                if(users == -1){
                    console.log("test failed.");
                    return;
                }
                console.log("testing get users by properties...");
                getUserByProperty(users, ["name", "email", "login", "likes", "favorites", "uses", "respectLevel"], function(users){
                    if(users == -1){
                        console.log("test failed.");
                        return;
                    }
                    searchUserByName(users, function(users){
                        if(users == -1){
                            console.log("test failed.");
                            return;
                        }
                        createUser(function(user){
                            if(user == -1){
                                console.log("test failed.");
                                return;
                            }
                            updateUser(user, function(user){
                                if(user == -1){
                                    console.log("test failed.");
                                    return;
                                }
                                deleteUser(user, function(answer){
                                    if(answer == -1){
                                        console.log("users test failed.");
                                        return;
                                    }
                                    if(answer == 0){
                                        console.log("users tests ok.")
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    run();
}

var tradesmanTests = function(){

    var getTradesmen = function(callback){
        request.get(domain + "/tradesmen", function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("get tradesmen test ok.")
                callback(JSON.parse(body).data);
            } else {
                console.log("error with get tradesmen :");
                console.log("error: ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var searchTradesmenByName = function(tradesmen, callback){
        var names = _.map(tradesmen, function(tradesman){return tradesman.name;});
        var counter = names.length - 1;
        for(var i = 0; i < names.length; i++){
            var data = {};
            request.get(domain + "/tradesmen/search/" + names[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("search tradesmen by name test ok.")
                        callback(tradesmen);
                    }
                } else {
                    console.log("error with search tradesmen by name :");
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var getTradesmenById = function(tradesmen, callback){
        var ids = _.map(tradesmen, function(tradesman){return tradesman.id || tradesman._id;});
        var counter = ids.length - 1;
        for(var i = 0; i < ids.length; i++){
            var data = {};
            request.get(domain + "/tradesmen/" + ids[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("get tradesmen by id test ok.")
                        callback(tradesmen);
                    }
                } else {
                    console.log("error with get tradesmen by id : ", error);
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var getTradesmenByProperty = function(tradesmen, properties, callback){
        callback(tradesmen);
        return;
        var p_counter = properties.length - 1;
        for(var index = 0, property; index < properties.length; index++){
            var props = _.map(tradesmen, function(tradesman){return tradesman[property];});
            var counter = props.length - 1;
            for(var i = 0; i < props.length; i++){
                var data = {};
                data[property] = props[i];
                request.get(domain + "/tradesmen", data, function(error, response, body){
                    if(!error && response.statusCode == 200){
                        if((--counter == 0) && (--p_counter == 0)){
                            console.log("get tradesmen by property test ok.");
                            callback(tradesmen);
                        }
                    } else {
                        console.log("error with get tradesmen by " + property + " : ");
                        console.log("error : ", error);
                        console.log("body  : ", body);
                        callback(-1);
                    }
                })
            }
        }
    }

    var createTradesman = function(callback){
        var tradesman = require("./mocks/tradesman").mock;
        request.post(domain + "/tradesmen", JSON.stringify(tradesman), function(error, response, body){
            if(response.statusCode == 201){
                console.log("create tradesman test ok.")
                callback(JSON.parse(body));
            } else {
                console.log("error with create tradesman : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var updateTradesman = function(tradesman, callback){
        tradesman.name += "test";
        request.put(domain + "/tradesmen/" + tradesman._id, JSON.stringify(tradesman), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("update tradesman test ok.")
                callback(tradesman);
            } else {
                console.log("error with create tradesman : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var deleteTradesman = function(tradesman, callback){
        request.del(domain + "/tradesmen/" + (tradesman.id || tradesman._id), function(error, response, body){
            if(response.statusCode == 200){
                console.log("create tradesman test ok.")
                callback(0);
            } else {
                console.log("error with create tradesman : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var run = function(){
        console.log("testing tradesmen api...");
        console.log("testing get tradesmen ...");
        getTradesmen(function(tradesmen){
            if(tradesmen == -1){
                console.log("get tradesmen test failed.");
                return -1;
            }
            console.log("testing get tradesmen by name...");
            searchTradesmenByName(tradesmen, function(tradesmen){
                if(tradesmen == -1){
                    console.log("search tradesmen by name test failed.");
                    return -1
                }
                console.log("testing get tradesmen by id...");
                getTradesmenById(tradesmen, function(){
                    console.log("testing get tradesmen by properties...");
                    getTradesmenByProperty(tradesmen, ["name", "type", "location", "usePlan"], function(tradesmen){
                        if(tradesmen == -1){
                            console.log("get tradesmen by property test failed.");
                            return -1;
                        }
                        console.log("testing create tradesman ...");
                        createTradesman(function(tradesman){
                            if(tradesman == -1){
                                console.log("create tradesman test failed.");
                                return -1;
                            }
                            console.log("testing update tradesman ...");
                            updateTradesman(tradesman, function(tradesman){
                                if(tradesman == -1){
                                    console.log("delete tradesman test failed.");
                                    return -1;
                                }
                                console.log("testing delete tradesman ...");
                                deleteTradesman(tradesman, function(answer){
                                    if(answer == 0){
                                        console.log("tradesmen test ok.");
                                        return 0;
                                    }
                                    if(answer == -1){
                                        console.log("tradesmen test failed.")
                                        return -1;
                                    }
                                })
                            })
                        })
                    })
                })
            })
        });
    }

    run();
}

var productTests = function(){

    var getProducts = function(callback){
        request.get(domain + "/products", function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("get products test ok.")
                callback(JSON.parse(body));
            } else {
                console.log("error with get products : ");
                console.log("error : ", error);
                console.log("body  : ", body);
                callback(-1)
            }
        });
    }

    var getProductsById = function(products, callback){
        var ids = _.map(products, function(product){return product.id || product._id;});
        var counter = ids.length - 1;
        for(var i = 0; i < ids.length; i++){
            var data = {};
            request.get(domain + "/products/" + ids[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("get products by id test ok.")
                        callback(products);
                    }
                } else {
                    console.log("error with get products by id : ", error);
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var getProductsByProperties = function(products, properties, callback){
        callback(products);
        return;
        var p_counter = properties.length - 1;
        for(var index = 0, property; index < properties.length; index++){
            var props = _.map(products, function(product){return product[property];});
            var counter = props.length - 1;
            for(var i = 0; i < props.length; i++){
                var data = {};
                data[property] = props[i];
                request.get(domain + "/products", data, function(error, response, body){
                    if(!error && response.statusCode == 200){
                        if((--counter == 0) && (--p_counter == 0)){
                            console.log("get products by property test ok.");
                            callback(products);
                        }
                    } else {
                        console.log("error with get products by " + property + " : ");
                        console.log("error : ", error);
                        console.log("body  : ", body);
                        callback(-1);
                    }
                })
            }
        }
    }

    var searchProductsByName = function(products, callback){
        var names = _.map(products, function(product){return product.name;});
        var counter = names.length - 1;
        for(var i = 0; i < names.length; i++){
            var data = {};
            request.get(domain + "/products/search/" + names[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("search products by name test ok.")
                        callback(products);
                    }
                } else {
                    console.log("error with search products by name :");
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var createProduct = function(callback){
        var product = require("./mocks/product").mock;
        request.post(domain + "/products", JSON.stringify(product), function(error, response, body){
            if(!error && response.statusCode == 201){
                console.log("create product test ok.")
                callback(JSON.parse(body));
            } else {
                console.log("error with create product : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var updateProduct = function(product, callback){
        product.name += "test";
        request.put(domain + "/products/" + product._id, JSON.stringify(product), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("update product test ok.")
                callback(product);
            } else {
                console.log("error with update product : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var deleteProduct = function(product, callback){
        request.del(domain + "/products/" + (product.id || product._id), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("create product test ok.")
                callback(0);
            } else {
                console.log("error with create product : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var run = function(){
        console.log("testing products api...");
        console.log("testing get products...");
        getProducts(function(products){
            if(products == -1){
                console.log("get products test failed.");
                return -1;
            }
            console.log("testing search products by name...");
            searchProductsByName(products, function(products){
                if(products == -1){
                    console.log("search products by name test failed.");
                    return -1
                }
                console.log("testing get products by ids...");
                getProductsById(products, function(){
                    getProductsByProperties(products, ["name", "vendor", "type", "vender", "creator"], function(products){
                        if(products == -1){
                            console.log("get products by property test failed.");
                            return -1;
                        }
                        console.log("testing create product...");
                        createProduct(function(product){
                            if(product == -1){
                                console.log("create product test failed.");
                                return -1;
                            }
                            console.log("testing update product...");
                            updateProduct(product, function(product){
                                if(product == -1){
                                    console.log("update product test failed.");
                                    return -1;
                                }
                                console.log("testing delete product...");
                                deleteProduct(product, function(answer){
                                    if(answer == 0){
                                        console.log("products test ok.");
                                        return 0;
                                    }
                                    if(answer == -1){
                                        console.log("products test failed.")
                                        return -1;
                                    }
                                })
                            })
                        })
                    })
                })
            })
        });
    }

    run();
}

var messageTests = function(){

    var getMessages = function(callback){
        request.get(domain + "/messages", function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("get messages test ok.")
                callback(JSON.parse(body));
            } else {
                console.log("error with get messages :");
                console.log("error : ", error);
                console.log("body  : ", body);
                callback(-1);
            }
        })
    }

    var getMessagesByIds = function(messages, callback){
        var ids = _.map(messages, function(message){return message.id || message._id;});
        var counter = ids.length;
        if(ids.length == 0)
            callback(messages);
        for(var i = 0; i < ids.length; i++){
            var data = {};
            request.get(domain + "/messages/" + ids[i], function(error, response, body){
                if(!error && response.statusCode == 200){
                    if(--counter == 0){
                        console.log("get messages by id test ok.")
                        callback(messages);
                    }
                } else {
                    console.log("error with get messages by id : ", error);
                    console.log("error : ", error);
                    console.log("body  : ", body);
                    callback(-1);
                }
            })
        }
    }

    var getMessagesByProperties = function(messages, properties, callback){
        callback(messages);
        return;
        var p_counter = properties.length - 1;
        for(var index = 0, property; index < properties.length; index++){
            var props = _.map(messages, function(message){return message[property];});
            var counter = props.length - 1;
            for(var i = 0; i < props.length; i++){
                var data = {};
                data[property] = props[i];
                request.get(domain + "/messages", data, function(error, response, body){
                    if(!error && response.statusCode == 200){
                        if((--counter == 0) && (--p_counter == 0)){
                            console.log("get messages by property test ok.");
                            callback(messages);
                        }
                    } else {
                        console.log("error with get messages by " + property + " : ");
                        console.log("error : ", error);
                        console.log("body  : ", body);
                        callback(-1);
                    }
                })
            }
        }
    }

    var createMessage = function(callback){
        var message = require("./mocks/message").mock;
        request.post(domain + "/messages", JSON.stringify(message), function(error, response, body){
            if(!error && response.statusCode == 201){
                console.log("create message test ok.")
                callback(JSON.parse(body));
            } else {
                console.log("error with create message : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var updateMessage = function(message, callback){
        message.name += "test";
        request.put(domain + "/messages/" + message._id, JSON.stringify(message), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("update message test ok.")
                callback(message);
            } else {
                console.log("error with create message : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var deleteMessage = function(message, callback){
        request.del(domain + "/messages/" + (message.id || message._id), function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log("create message test ok.")
                callback(0);
            } else {
                console.log("error with create message : ");
                console.log("error : ", error);
                console.log("body : ", body);
                callback(-1);
            }
        })
    }

    var run = function(){
        console.log("testing messages api...")
        console.log("get messages testing...");
        getMessages(function(messages){
            if(messages == -1){
                console.log("get messages test failed.")
                return -1;
            }
            console.log("get messages by id testing...");
            getMessagesByIds(messages, function(messages){
                if(messages == -1){
                    console.log("get messages by ids test failed.")
                    return -1;
                }
                console.log("get messages by properties testing...");
                getMessagesByProperties(messages, ["user", "tradesman", "product"], function(messages){
                    if(messages == -1){
                        console.log("get messages by properties test failed.")
                        return -1;
                    }
                    console.log("create message testing...");
                    createMessage(function(message){
                        if(message == -1){
                            console.log("create message test failed.")
                            return -1;
                        }
                        console.log("update message testing...");
                        updateMessage(message, function(message){
                            if(message == -1){
                                console.log("update message test failed.")
                                return -1;
                            }
                            console.log("delete message testing...");
                            deleteMessage(message, function(answer){
                                if(answer == -1){
                                    console.log("delete message test failed.")
                                    return -1;
                                }
                                if(answer == 0){
                                    console.log("messages tests ok");
                                    return 0;
                                }
                            })
                        })
                    })
                })
            })
        })
    }

    run();
}

exports.run = function(){
    userTests();
    productTests();
    tradesmanTests();
    messageTests();
}

exports.run();