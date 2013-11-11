var mongoose = require("mongoose");
var nStore = require("nstore");
var tradesman_nStore = nStore.new("data/tradesmen.db", function(){
    console.log("tradesmen nStore ready");
})
var storage = {
    tradesman: {
        count: 0
    }
}
var router = {
    get: {},
    post: {},
    put: {},
    delete: {}
}

router.get = {
    '/tradesmen': function(req, res){
        var tradesman = mongoose.model("tradesman");
        tradesman.get(req.params, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, {
                    total: storage.tradesman.count,
                    skip: req.params.skip || 0,
                    limit: req.params.limit || 15,
                    data: result
                });
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/tradesmen/:id': function(req, res){
        var tradesman = mongoose.model("tradesman");
        tradesman.findById(req.params.id, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/tradesmen/search/:name': function(req, res){
        var tradesman = mongoose.model("tradesman");
        tradesman.search(req.params, function(err, result){
            if(!err){
                res.contentType = "json";
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
    '/tradesmen': function(req, res){
        var Tradesman = mongoose.model("tradesman");
        var tradesman = new Tradesman(req.params);
        tradesman.save(function(err, result){
            if(!err){
                storage.tradesman.count++;
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(201, result);
                tradesman_nStore.save(result._id, { data: result, state: "created" });
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.put = {
    '/tradesmen/:id': function(req, res){
        var tradesman = mongoose.model("tradesman");
        tradesman.update({ _id: req.params.id }, req.params, function(err, result){
            if(!err){
                res.send(200);
                tradesman_nStore.save(result._id, { data: result, state: "updated" });
            } else {
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.del = {
    '/tradesmen/:id': function(req, res){
        var tradesman = mongoose.model("tradesman");
        tradesman.remove({ _id: req.params.id }, function(err){
            if(!err){
                storage.tradesman.count++;
                res.send(200);
                tradesman_nStore.save(req.params.id, { data: {_id: req.params.id }, state: "deleted" });
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
    mongoose.model("tradesman").count({}, function(err, count){
        if(err){
            console.log("error with counting tradesman count : ", err);
        }
        storage.tradesman.count = count || 0;
    })
}

exports.install = router.install;