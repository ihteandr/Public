var Category = require('../database/models/category/model');
var Product = require('../database/models/product/model');
var Promise = require('promise');
var async = require('async');
var _ = require('lodash');

function run(){
    return new Promise(function(resolve, reject){
        Category.find({}, function(err, categories){
            if(err){
                reject(err);
            } else {
                async.each(categories, function(category, callback){
                    Product.find({category: category}, function(err, products){
                        if(err){
                            reject(err);
                        } else {
                            var max_adding = 0;
                            _.each(products, function(product){
                                if(product.addingInBasket > max_adding){
                                    max_adding = product.addingInBasket;
                                }
                            });
                            async.each(products, function(product, callback){
                                product.rating = Math.round(5*product.addingInBasket/max_adding);
                                product.save(callback);
                            }, callback);
                        }
                    });
                }, function(err){
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
                });
            }
        });
    });
}

module.exports = {
    run: run
};
