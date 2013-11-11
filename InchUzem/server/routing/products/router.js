var Tiny = require("tiny");
var _ = require("underscore");
var Settings = require("settings/settings");
var restify = require("restify");
var rest_client = restify.createJsonClient({
    url: Settings.API_URI
});
var utils = require("utils/utils");


var router = {

}

router.get = {
    '/products/:id': function(req, res, next){
        var id = req.params.id;
        utils.answer("db/products.tiny", "/products/" + id, id)
    },
    '/products': function(req, res, next){ //{options}
        var options = req.params;
        rest_client.get("/products", options, function(err, res, req, obj){
            if(err){
                res.send({error: err}, 500);
                res.end();
                return;
            }
            res.send(obj, 200);
            res.end()
        })
    },
    '/products/search/:name': function(req, res, next){
        var name = req.params.name;
        rest_client.get('/products/search/' + name, function(err, res, req, obj){
            if(err){
                res.send({error: err}, 500);
                res.end();
                return;
            }
            res.send(obj, 200);
            res.end()
        })
    }
}

router.put = {
    '/products/:id': function(req, res, next){
        var product = req.body;
        var id = req.params.id;
        rest_client.put("/products/" + id, product, function(err, res, req, obj){
            if(err){
                res.send({error: err}, 500);
                res.end();
                return;
            }
            res.send(obj, 200);
            res.end()
        })
    }
}

exports.install = function(app){
    for(var method in router){
        for(var route in router[method]){
            app[method](route, router[method][route]);
        }
    }
}