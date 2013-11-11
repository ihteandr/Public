var nStore = require("nstore");
var products_nStore = nStore.new("data/products.db", function(){
})
var messages_nStore = nStore.new("data/messages.db", function(){
})
var tradesmen_nStore = nStore.new("data/tradesmen.db", function(){
})
var router = {
    get: {},
    post: {},
    put: {},
    del: {}
}

router.get = {
    '/updates': function(req, res){
        var updates = {
            products: null,
            messages: null,
            tradesmen: null
        };

        tradesmen_nStore.all(function(err, results){
            if(!err){
                updates.tradesmen = results;
                messages_nStore.all(function(err, results){
                    if(!err){
                        updates.messages = results;
                        products_nStore.all(function(err, results){
                            if(!err){
                                updates.products = results;
                                res.send(updates, 200);
                                res.end();
                            }
                            res.send({message: "Internal Server Error"}, 500);
                            res.end();
                        })
                    }

                    res.send({message: "Internal Server Error"}, 500);
                    res.end();
                })
            }
            res.send({message: "Internal Server Error"}, 500);
            res.end();
        })
    }
}


router.install = function(app){
    for(var method in router){
        for(var route in router[method]){
            app[method](route, router[method][route]);
        }
    }
}
