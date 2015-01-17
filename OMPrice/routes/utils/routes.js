var _ = require("lodash");
var Market = require("../../database/models/market/model");
var Section = require("../../database/models/section/model");
var Category = require("../../database/models/category/model");
var Family = require("../../database/models/family/model");
var Country = require("../../database/models/country/model");
var Brand = require("../../database/models/brand/model");
var async = require('async');

var routes = {};

routes.get = {
    "/markets": function(req, res, next){
        var full = req.param("full");
        Market.find({}, function(err, markets){
            if(err){
                console.log("Error find markets ", err);
                next(err);
            } else {
                if(full){
                    markets = _.map(markets, function(market){
                        return {
                            _id: market._id,
                            name: market.name
                        };
                    });
                    async.each(markets, function(market, callback){
                        market = _.find(markets, function(m){
                            return m == market;
                        });
                        Section.find({market: market._id}, function(err, sections){
                            if(err){
                                callback(err);
                            } else {
                                market.sections = _.map(sections, function(section){
                                    return {
                                        _id: section._id,
                                        name: section.name,
                                        market: section.market
                                    };
                                });
                                async.each(market.sections, function(section, callback){
                                    section = _.find(market.sections, function(s){
                                        return s == section;
                                    });
                                    Category.find({section: section._id}, function(err, categories){
                                        if(err){
                                            callback(err);
                                        } else {
                                            section.categories = _.map(categories, function(category){
                                                return {
                                                    _id: category._id,
                                                    name: category.name,
                                                    section: category.section
                                                };
                                            });
                                            callback();
                                        }
                                    });
                                }, callback);
                            }
                        });
                    }, function(err){
                        if(err){
                            next(err);
                        } else {
                            res.status(200).json({status: "success", data: markets}).end();
                        }
                    });
                } else {
                    res.status(200).json({status: "success", data:markets}).end();
                }
            }
        });
    },
    "/sections": function(req, res, next){
        var query = {};
        var market = req.param("market");
        if(market === ""){
            return res.status(200).json({status: "success", data: []}).end();
        } else if(market){
            query.market = market;
        }
        Section.find(query, function(err, sections){
            if(err){
                console.log("Error find section ", err);
                next(err);
            } else {
                res.status(200).json({status: "success", data: sections}).end();
            }
        });
    },
    "/categories": function(req, res, next){
        var query = {};
        var section = req.param("section");
        if(section === ""){
            return res.status(200).json({status: "success", data: []}).end();
        } else if(section){
            query.section = section;
        }
        Category.find(query, function(err, categories){
            if(err){
                console.log("Error find category ", err);
                next(err);
            } else {
                res.status(200).json({status: "success", data: categories}).end();
            }
        });
    },
    "/families": function(req, res, next){
        var query = {};
        var category = req.param("category");
        if(category === ""){
            return res.status(200).json({status: "success", data: []}).end();
        } else if(category !== "undefined"){
            query.category = category;
        }
        Family.find(query, function(err, families){
            if(err){
                console.log("Error find Family ", err);
                next(err);
            } else {
                res.status(200).json({status: "success", data: families}).end();
            }
        });
    },
    "/countries": function(req, res, next){
        var full = req.param("full");
        if(full){
            var countries = require("../../database/data/countries.json");
            countries = _.map(countries, function(country){
                return {
                    name: country
                };
            });
            res.status(200).json({status: "success", data: countries}).end();
        } else {
            Country.find({}, function(err, countries){
                if(err){
                    console.error("Error find countries", err);
                    next(err);
                } else {
                    res.status(200).json({status: "success", data: countries}).end();
                }
            });
        }
    },
    "/brands": function(req, res, next){
        Brand.find({}, function(err, brands){
            if(err){
                console.error("Error find countries", err);
                next(err);
            } else {
                res.status(200).json({status: "success", data: brands}).end();
            }
        });
    },
    "/bulkUnits": function(req, res, next){
        res.status(200).json({
            status: "success",
            data: ["гр", "кг", "л", "мл"]
        }).end();
    }
};

routes.post = {};

routes.put = {};

module.exports = {
    install: function(app){
        for(var method in routes){
            for(var path in routes[method]){
                app[method](path, routes[method][path]);
            }
        }
    }
};