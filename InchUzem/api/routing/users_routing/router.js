var mongoose = require("mongoose");
var nStore = require('nstore');
var storage = {
    users: {
        count: 0
    }
}
var users_nStore = nStore.new("data/users.db", function(){
    console.log("users nStore ready");
});
var router = {
    get: {},
    post: {},
    put: {},
    delete: {}
}

router.get = {
    '/users': function(req, res){
        var user = mongoose.model("user");
        user.get(req.params, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, {
                    skip: req.params.skip || 0,
                    limit: req.params.limit || 50,
                    total: storage.users.count,
                    data: result
                });
            } else {
                console.log("get: /users error: ", err);
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/users/:id': function(req, res){
        var user = mongoose.model("user");
        user.findById(req.params.id, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                console.log("get: /users/:id error: ", err);
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/users/search/:name': function(req, res){
        var user = mongoose.model("user");
        user.search(req.params, function(err, result){
            if(!err){
                res.contentType = "json";
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                console.log("get: /users/search/:name error: ", err);
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.post = {
    '/users': function(req, res){
        req.contentType = "json";
        var User = mongoose.model("user");
        var user = new User(req.params);
        user.save(function(err, result){
            if(!err){
                storage.users.count++;
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(201, result);
            } else {
                console.log("post: /users error: ", err);
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.put = {
    '/users/:id': function(req, res){
        var user = mongoose.model("user");
        user.update({ _id: req.params.id }, req.params, function(err, result){
            if(!err){
                res.send(200, result);
            } else {
                console.log("put: /users/:id error: ", err);
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.del = {
    '/users/:id': function(req, res){
        var user = mongoose.model("user");
        user.remove({ _id: req.params.id }, function(err){
            if(!err){
                storage.users.count--;
                res.send(200)
            } else {
                console.log("del: /users/:id error: ", err);
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
    mongoose.model("user").count({}, function(error, count){
        if(error){
            console.log("error with counting users : ", error);
        }
        storage.users.count = count || 0;
    })
}

exports.install = router.install;