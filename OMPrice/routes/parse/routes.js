var xlsx = require('node-xlsx');
var crypto = require("crypto");
var _ = require("lodash");
var Promise = require("promise");
var async = require("async");
var Market = require("../../database/models/market/model"),
    Section = require("../../database/models/section/model"),
    Category = require("../../database/models/category/model"),
    Family = require("../../database/models/family/model"),
    Product = require("../../database/models/product/model"),
    Details = require("../../database/models/details/model"),
    Nutritional = require("../../database/models/nutritional/model"),
    Country = require("../../database/models/country/model"),
    Brand = require("../../database/models/brand/model"),
    Shop = require("../../database/models/shop/model"),
    ProductPrice = require("../../database/models/productPrice/model");
var RobotSearcherFurshet = require("../../robots/search/furshet/robot");
var robotSearcherFurshet = new RobotSearcherFurshet();
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


function findProduct(ean){
    return new Promise(function(resolve, reject){
        var exp = new RegExp("/" + ean + "/igm");
        Product.findOne({ean: exp}, function(err, product){
            if(err){
                reject(err);
            } else {
                resolve(product);
            }
        });
    });
}

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
                                    var saveDetails = function(){
                                        _details.product = _product;
                                        _details.save(function(err){
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
                                    };

                                    robotSearcherFurshet.getProductData(_product.ean).then(function(data){
                                        if(!data){
                                            return saveDetails();
                                        }
                                        _product.saveImages(data.images).then(function(){
                                            _product.save(function(err){
                                                if(err){
                                                    reject(err);
                                                } else {
                                                    var setCountry = function(){
                                                        Country.findOne({name: data.country}, function(err, country){
                                                            if(err){
                                                                return reject(err);
                                                            }
                                                            if(country){
                                                                _details.country = country;
                                                                saveDetails();
                                                            } else {
                                                                country = new Country({name: data.country});
                                                                country.save(function(err){
                                                                    if(err){
                                                                        reject(err);
                                                                    } else {
                                                                        _details.country = country;
                                                                        saveDetails();
                                                                    }
                                                                });
                                                            }
                                                        })
                                                    };
                                                    Brand.findOne({name: data.brand}, function(err, brand){
                                                       if(err){
                                                           return reject(err);
                                                       }
                                                       if(brand){
                                                           _details.brand = brand;
                                                           setCountry();
                                                       } else {
                                                           brand = new Brand({name: data.brand});
                                                           brand.save(function(err){
                                                               if(err){
                                                                   reject(err);
                                                               } else {
                                                                   _details.brand = brand;
                                                                   setCountry();
                                                               }
                                                           });
                                                       }
                                                    });
                                                }
                                            });
                                        }, reject);
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
            Market.findOne({ id: market.id }, function(err, data){
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
var extensions= ["xlsx"];
function testHeaders(headers, type){
    var headers = _.map(headers, function(header){
        return header.trim().toLowerCase()
    });
    if(type == "products"){
        return _.isEqual(headers, ["название", "штрих-код","рынок-сегмент-категория-семья", "рынок", "рынок",
            "сегмент", "сегмент", "категория", "категория", "семья", "семья"]);
    }
    if(type == "prices"){
        return true;
        return _.isEqual(headers, ["название", "штрих-код","рынок-сегмент-категория-семья", "рынок", "рынок",
            "сегмент", "сегмент", "категория", "категория", "семья", "семья"]);
    }
    if(type == "shops"){
        return _.isEqual(headers, ["код города", "код района","код микрорайона", "код сети", "код магазина",
            "полный код", "название торговой сети", "адрес магазина", "координаты-1", "координаты-2"]);
    }
    return -1;
}

routes.post = {
    "/parse/products":  function(req, res){
        var file = req.files["upload_file"];

        if(req.user.permissions < 2){
            return res.status(200).send({status: "fail", error: { message: "У вас нет прав для этой операции" }});
        }

        if(!_.contains(extensions, file.extension)){
            return res.status(200).send({status: "fail", error: { message: "Неправельный формат файла" }});
        }

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

        var tables = xlsx.parse(file.path);
        var headers = tables[0].data[0];
        if(!testHeaders(headers, "products")){
            return res.status(0).send({status: "fail", error:{message:"Файл не содержет необходимых данных"}})
        }
        robotSearcherFurshet.run();
        var markets = [];
        for(var t = 0, table; table = tables[t];t++){
            for(var i = 1, len = table.data.length; i < len; i++){
                var market = _.find(markets, function(data){
                    return data.id == table.data[i][3];
                });
                if(!market){
                    market = {
                        name: table.data[i][4],
                        id: table.data[i][3],
                        sections: []
                    };
                    TOTAL_MARKETS++;
                    markets.push(market);
                }
                var section = _.find(market.sections, function(data){
                    return data.id == table.data[i][5];
                });
                if(!section){
                    section = {
                        name: table.data[i][6],
                        id: table.data[i][5],
                        categories: []
                    };
                    TOTAL_SECTIONS++;
                    market.sections.push(section);
                }

                var category = _.find(section.categories, function(data){
                    return data.id == (table.data[i][7] || (section.name + section.id));
                });
                if(!category){
                    category ={
                        name: table.data[i][8] ||  section.name,
                        id: table.data[i][7] || (section.name + section.id),
                        families: []
                    };
                    TOTAL_CATEGORIES++;
                    section.categories.push(category);
                }
                var family = _.find(category.families, function(data){
                    return data.id == (table.data[i][9] || (category.name + category.id));
                });
                if(!family){
                    family ={
                        name: table.data[i][10] || category.name,
                        id: table.data[i][9] || (category.name + category.id),
                        products: []
                    };
                    TOTAL_FAMILIES++;
                    category.families.push(family);
                }
                var product = _.find(family.products, function(data){
                    return data.ean == table.data[i][1];
                });
                if(!product){
                    product = {
                        name: table.data[i][0],
                        ean: table.data[i][1],
                        details: {
                            nutritional: {}
                        }
                    };

                    TOTAL_PRODUCTS++;
                    family.products.push(product);
                }
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
    },

    "/parse/prices": function(req, res){
        var file = req.files["upload_file"];

        if(req.user.permissions < 2){
            return res.status(200).send({status: "fail", error: { message: "У вас нет прав для этой операции" }});
        }

        if(!_.contains(extensions, file.extension)){
            return res.status(200).send({status: "fail", error: { message: "Неправельный формат файла" }});
        }

        var tables = xlsx.parse(file.path);
        var headers = tables[0].data[0];
        if(!testHeaders(headers, "prices")){
            return res.status(0).send({status: "fail", error:{message:"Файл не содержет необходимых данных"}})
        }

        res.status(200).send({status: "success"}).end();

        async.eachSeries(tables, function(table,callback){
            delete table.data[0];
            async.eachSeries(table.data, function(row, callback){
                if(typeof row == "undefined"){
                    return callback();
                }
                Shop.findOne({fullCode: row[0]}, function(err, shop){
                    if(err){
                        callback(err);
                    } else if(shop){
                        shop.save(function(err){
                            if(err){
                                callback(err);
                            } else {
                                findProduct(row[1]).then(function(product){
                                    if(product){
                                        var price = new ProductPrice({
                                            shop: shop,
                                            product: product,
                                            price: row[4]
                                        });
                                        price.save(function(err){
                                            if(err){
                                                callback(err);
                                            } else {
                                                product.populate("prices").exec(function(err){
                                                    if(err){
                                                        callback(err);
                                                    } else {
                                                        product.prices = _.filter(product.prices, function(price){
                                                            return price.shop != shop._id
                                                        });
                                                        if(product.shops.indexOf(shop._id) == -1){
                                                            product.shops.push(shop._id);
                                                        }
                                                        product.prices.push(price);
                                                        product.save(callback);
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        callback();
                                    }
                                }, callback)
                            }
                        });
                    }else{
                        callback();
                    }
                });
            }, callback);
        }, function(err){
            if(err){
                console.log("Error ", err);
            } else {
                console.log("PRICES DATA WAS PARSED!")
            }
        })
    },

    "/parse/shops": function(req, res){
        var file = req.files["upload_file"];

        if(req.user.permissions < 2){
            return res.status(200).send({status: "fail", error: { message: "У вас нет прав для этой операции" }});
        }

        if(!_.contains(extensions, file.extension)){
            return res.status(200).send({status: "fail", error: { message: "Неправельный формат файла" }});
        }

        var tables = xlsx.parse(file.path);
        var headers = tables[0].data[0];
        if(!testHeaders(headers, "shops")){
            return res.status(0).send({status: "fail", error:{message:"Файл не содержет необходимых данных"}})
        }

        res.status(200).send({status: "success"}).end();
        async.eachSeries(tables, function(table,callback){
            delete table.data[0];
            async.eachSeries(table.data, function(row, callback){
                if(typeof row == "undefined"){
                    return callback();
                }
                var data = {
                    cityCode: row[0],
                    districtCode: row[1],
                    miniDistrictCode: row[2],
                    networkCode: row[3],
                    code: row[4],
                    fullCode: row[5],
                    network: row[6],
                    address: row[7],
                    location:{
                        latitude: row[8],
                        longitude: row[9]
                    },
                    name: row[6]
                };
                Shop.findOne({fullCode: data.fullCode}).exec(function(err, shop){
                    if(err){
                        callback(err);
                    } else if(shop){
                        for(var i in data){
                            shop[i] = data[i]
                        }
                    } else {
                        var shop = new Shop(data);
                    }
                    shop.save(callback);
                });
            }, callback);
        }, function(err){
            if(err){
                console.log("Error ", err);
            } else {
                console.log("PRICES DATA WAS PARSED!")
            }
        })
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