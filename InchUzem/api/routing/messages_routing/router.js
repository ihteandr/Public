var mongoose = require("mongoose");
var nStore = require("nstore");
var messages_nStore = nStore.new("data/messages.db", function(){
    console.log("messages nStore ready");
})

var router = {
    get: {},
    post: {},
    put: {},
    delete: {}
}

router.get = {
    '/messages': function(req, res){
        var message = mongoose.model("message");
        message.get(req.params, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                console.log("get: /messages : error: ", err);
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/messages/:id': function(req, res){
        var message = mongoose.model("message");
        message.findById(req.params.id, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.post = {
    '/messages': function(req, res){
        var Message = mongoose.model("message");
        var message = new Message(req.params);
        message.save(function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(201, result);
                messages_nStore.save(result._id, { data: result, state: "created" });
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.put = {
    '/messages/:id': function(req, res){
        var message = mongoose.model("message");
        message.update({ _id: req.params.id }, req.params, function(err, result){
            if(!err){
                res.send(200);
                messages_nStore.save(result._id, { data: result, state: "updated" });
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.del = {
    '/messages/:id': function(req, res){
        var message = mongoose.model("message");
        message.remove({ _id: req.params.id }, function(err){
            if(!err){
                res.send(200);
                messages_nStore.save(req.params.id, { data: { _id: req.params.id }, state: "deleted" });
            } else {
                res.send(500, "Internal Server Error");
            }
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

exports.install = router.install;