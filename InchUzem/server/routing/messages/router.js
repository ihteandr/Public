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
    '/messages/:id': function(req, res, next){
        var id = req.params.id;
        utils.answer("db/messages.tiny", "/messages/" + id, id)
    },
    '/messages': function(req, res, next){ //options
        var options = req.params;
        rest_client.get("/messages", options, function(err, res, req, obj){
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

router.post = {
    '/messages': function(req, res, next){
        var message = req.body;
        var id = req.params.id;
        rest_client.post("/messages/" + id, message, function(err, res, req, obj){
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
    '/messages/:id': function(req, res, next){
        var message = req.body;
        var id = req.params.id;
        rest_client.put("/messages/" + id, message, function(err, res, req, obj){
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

router.del = {
    '/messages/:id': function(req, res, next){
        var message = req.body;
        var id = req.params.id;
        rest_client.del("/messages/" + id, function(err, res, req, obj){
            if(err){
                res.send({error: err}, 500);
                res.end();
                return;
            }
            res.send({}, 200);
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