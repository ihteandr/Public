var Product = require("../../database/models/product/model"),
    Basket = require('../../database/models/basket/model');

var routes = {};


routes.get = {
    '/basket': function(req, res, next){
        var user = req.param("user");
        if(user){
            Basket.find({user: user}).populate("items.product items.product.prices items.product.prices.shop").exec(function(err, basket){
                if(err){
                    next(err);
                } else {
                    res.status(200).send({status: "success", data: basket}).end();
                }
            });
        } else {
            res.status(200).send({status: 'fail', error: {message: 'User property is missed'}}).end();
        }
    }
};

routes.put = {
    '/basket/:id': function(req, res, next){
        var id = req.param("id");
        var product = req.param('product');
        if(product){
            Basket.find({_id: id}, function(err, basket){
                if(err){
                    next(err);
                } else {
                    if(basket){
                        basket.products.push(product);
                        basket.save(function(err){
                            if(err){
                                next(err);
                            } else {
                                res.status(200).send({status: "success"}).end();
                            }
                        });
                    } else {
                        res.status(200).send({status: "success"}).end();
                    }
                }
            });
        } else {
            res.status(200).send({status: "fail", error: {message: "Product property is missed"}}).end();
        }
    }
};

module.exports = {
    install: function(app){
        for(var method in routes){
            for(var path in routes[method]){
                app[method](path, routes[method][path]);
            }
        }
    }
};


