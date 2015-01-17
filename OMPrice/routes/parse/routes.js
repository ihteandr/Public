var xlsx = require('node-xlsx');
var _ = require("lodash");
var Promise = require("promise");
var Market = require("../../database/models/market/model"),
    Section = require("../../database/models/section/model"),
    Category = require("../../database/models/category/model"),
    Family = require("../../database/models/family/model"),
    Product = require("../../database/models/product/model"),
    Details = require("../../database/models/details/model"),
    Nutritional = require("../../database/models/nutritional/model"),
    Country = require("../../database/models/country/model"),
    Brand = require("../../database/models/brand/model");


var routes = {};
var COUNT_PRODUCTS = 0;
var COUNT_FAMILIES = 0;
var COUNT_CATEGORIES = 0;
var COUNT_SECTIONS = 0;
var COUNT_MARKETS = 0;
var TOTAL_PRODUCTS = 0;
var TOTAL_FAMILIES = 0;
var TOTAL_CATEGORIES = 0;
var TOTAL_SECTIONS = 0;
var TOTAL_MARKETS = 0;

function saveProducts(products){
    return new Promise(function(resolve, reject){
        var count = products.length;
        _.each(products, function(product){
            var details = product.details;
            var nutritional = new Nutritional(details.nutritional);
            Product.findOne({ean: product.ean}, function(err, data){
                console.log("INIT PRODUCTS", Math.floor((++COUNT_PRODUCTS)/TOTAL_PRODUCTS * 100),"%");
                if(!data){
                    nutritional.save(function(err){
                        if(err){
                            reject(err);
                        } else {
                            details.nutritional = nutritional;
                            var _details = new Details(details);
                            _details.save(function(err){
                                if(err){
                                    reject(err);
                                } else {
                                    product.details = _details;
                                    var _product = new Product(product);
                                    _product.save(function(err){
                                        if(err){
                                            reject(err);
                                        } else {
                                            nutritional.product = _product;
                                            nutritional.save(function(err){
                                                if(err){
                                                    reject(err)
                                                } else {
                                                    count--;
                                                    if(count == 0){
                                                        resolve();
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    count--;
                    if(count == 0){
                        resolve();
                    }
                }
            });
        });
    });
}

function saveFamilies(families){
    var count = families.length;
    return new Promise(function(resolve, reject){
        _.each(families, function(family){
            var products = family.products;
            Family.findOne({id: family.id}, function(err, data){
                console.log("INIT Famileis", Math.floor((++COUNT_FAMILIES)/TOTAL_FAMILIES * 100),"%");
                var _family;
                var fn = function(products, family){
                    _.each(products, function(product){
                        product.market = family.market;
                        product.section = family.section;
                        product.category = family.category;
                        product.family = family;
                    });
                    saveProducts(products).then(function(){
                        if(--count == 0){
                            resolve();
                        }
                    }, function(err){
                        reject(err);
                    });
                }
                if(data){
                    _family = data;
                    fn(products, _family);
                } else {
                    _family = new Family(family);
                    _family.save(function(err){
                        if(err){
                            reject(err);
                        } else {
                            fn(products, _family);
                        }
                    });
                }
            });
        });
    });
}

function saveCategories(categories){
    var count = categories.length;
    return new Promise(function(resolve, reject){
        _.each(categories, function(category){
            var families = category.families;
            Category.findOne({id: category.id}, function(err, data){
                console.log("INIT CATEGORIES", Math.floor((++COUNT_CATEGORIES)/TOTAL_CATEGORIES * 100),"%");
                var _category;
                var fn = function(families, category){
                    _.each(families, function(family){
                        family.section = category.section;
                        family.market = category.market;
                        family.category = category;
                    });
                    saveFamilies(families).then(function(){
                        if(--count == 0){
                            resolve();
                        }
                    }, function(err){
                        reject(err);
                    });
                }
                if(data){
                    _category = data;
                    fn(families, _category);
                } else {
                    _category = new Category(category);
                    _category.save(function(err){
                        if(err){
                            reject(err);
                        } else {
                            fn(families, _category);
                        }
                    });
                }
            });
        });
    });
}

function saveSections(sections){
    var count = sections.length;
    return new Promise(function(resolve, reject){
        _.each(sections, function(section){
            var categories = section.categories;
            Section.findOne({id: section.id}, function(err, data){
                console.log("INIT SECTIONS", Math.floor((++COUNT_SECTIONS)/TOTAL_SECTIONS * 100),"%");
                var _section;
                var fn = function(categories, section){
                    _.each(categories, function(category){
                        category.market = section.market;
                        category.section = section;
                    });
                    saveCategories(categories).then(function(){
                        if(--count == 0){
                            resolve();
                        }
                    }, function(err){
                        reject(err);
                    });
                }
                if(data){
                    _section = data;
                    fn(categories, _section);
                } else {
                    _section = new Section(section);
                    _section.save(function(err){
                        if(err){
                            reject(err);
                        } else {
                            fn(categories, _section);
                        }
                    });
                }
            });
        });
    });
}

function saveMarkets(markets){
    var count = markets.length;
    return new Promise(function(resolve, reject){
        _.each(markets, function(market){
            var sections = market.sections;
            Market.findOne({id: market.id}, function(err, data){
                console.log("INIT MARKETS", Math.floor((++COUNT_MARKETS)/TOTAL_MARKETS * 100),"%");
                var _market;
                var fn = function(sections, market){
                    _.each(sections, function(section){
                        section.market = market;
                    });
                    saveSections(sections).then(function(){
                        if(--count == 0){
                            resolve();
                        }
                    }, function(err){
                        reject(err);
                    });
                }
                if(data){
                    _market = data;
                    fn(sections, _market);
                } else {
                    _market = new Market(market);
                    _market.save(function(err){
                        if(err){
                            reject(err);
                        } else {
                            fn(sections, _market);
                        }
                    });
                }
            });
        });
    });
}

routes.get = {
    "/parse":  function(req, res, next){
        COUNT_PRODUCTS = 0;
        COUNT_FAMILIES = 0;
        COUNT_CATEGORIES = 0;
        COUNT_SECTIONS = 0;
        COUNT_MARKETS = 0;
        TOTAL_PRODUCTS = 0;
        TOTAL_FAMILIES = 0;
        TOTAL_CATEGORIES = 0;
        TOTAL_SECTIONS = 0;
        TOTAL_MARKETS = 0;

        var obj = xlsx.parse("excel/EAN1.xlsx"); // parses a file
        var markets = [];
        for(var i = 1, len = obj[0].data.length; i < len; i++){
            var market = _.find(markets, function(data){
                return data.id == obj[0].data[i][3];
            });
            if(!market){
                market = {
                    name: obj[0].data[i][4],
                    id: obj[0].data[i][3],
                    sections: []
                };
                TOTAL_MARKETS++;
                markets.push(market);
            }
            var section = _.find(market.sections, function(data){
                return data.id == obj[0].data[i][5];
            });
            if(!section){
                section = {
                    name: obj[0].data[i][6],
                    id: obj[0].data[i][5],
                    categories: []
                };
                TOTAL_SECTIONS++;
                market.sections.push(section);
            }

            var category = _.find(section.categories, function(data){
                return data.id == (obj[0].data[i][7] || (section.name + section.id));
            });
            if(!category){
                category ={
                    name: obj[0].data[i][8] ||  section.name,
                    id: obj[0].data[i][7] || (section.name + section.id),
                    families: []
                };
                TOTAL_CATEGORIES++;
                section.categories.push(category);
            }
            var family = _.find(category.families, function(data){
                return data.id == (obj[0].data[i][9] || (category.name + category.id));
            });
            if(!family){
                family ={
                    name: obj[0].data[i][10] || category.name,
                    id: obj[0].data[i][9] || (category.name + category.id),
                    products: []
                };
                TOTAL_FAMILIES++;
                category.families.push(family);
            }
            var product = _.find(family.products, function(data){
                return data.ean == obj[0].data[i][1];
            });
            if(!product){
                product = {
                    name: obj[0].data[i][0],
                    ean: obj[0].data[i][1],
                    details: {
                        nutritional: {}
                    }
                };
                TOTAL_PRODUCTS++;
                family.products.push(product);
            }
        }
        res.status(200).json({status: "success"}).end();
        saveMarkets(markets).then(function(){
            if(COUNT_PRODUCTS-TOTAL_PRODUCTS == 0){
                console.log("DATA WAS PARSED !");
            }
        }, function(err){
            console.error("Error with save markets ", err);
        });
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