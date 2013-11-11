var mongoose = require("mongoose");
var nStore = require("nstore");
var products_nStore = nStore.new("data/products.db", function(){
    console.log("products nStore ready");
})
var storage = {
    products: {
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
    '/products': function(req, res){
        var product = mongoose.model("product");
        product.get(req.params, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                console.log("get : /products : error : ", err)
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/products/:id': function(req, res){
        var product = mongoose.model("product");
        product.findById(req.params.id, function(err, result){
            if(!err){
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                console.log("get : /products/:id : error : ", err)
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    },
    '/products/search/:name': function(req, res){
        var product = mongoose.model("product");
        product.search(req.params, function(err, result){
            if(!err){
                res.contentType = "json";
                res.charSet("utf-8");
                res.send(200, result);
            } else {
                console.log("get : /products/search/:name : error : ", err)
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.post = {
    '/products': function(req, res){
        var Product = mongoose.model("product");
        var product = new Product(req.params);
        product.save(function(err, result){
            if(!err){
                storage.products.count++;
                res.contentType = 'json';
                res.charSet("utf-8");
                res.send(201, result);
                products_nStore.save(result._id, { data: result, state: "created" });
            } else {
                console.log("post : /products : error : ", err)
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.put = {
    '/products/:id': function(req, res){
        var product = mongoose.model("product");
        product.update({ _id: req.params.id }, req.body, function(err, result){
            if(!err){
                products_nStore.save(result._id, {data: result, state: "updated"});
                res.send(200);
            } else {
                console.log("put : /products/:id : error : ", err)
                res.send(500, "Internal Server Error");
            }
            res.end();
        })
    }
}

router.del = {
    '/products/:id': function(req, res){
        var product = mongoose.model("product");
        product.remove({ _id: req.params.id }, function(err){
            if(!err){
                storage.products.count--;
                products_nStore.save(req.params.id, {data: { _id: req.params.id }, state: "deleted"});
                res.send(200)
            } else {
                console.log("delete : /products/:id : error : ", err)
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
    mongoose.model("product").count({}, function(err, count){
        if(err){
            console.log("error with counting products count : ", err);
        }
        storage.products.count = count || 0;
    })
}

exports.install = router.install;