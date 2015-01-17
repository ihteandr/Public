var Tiny = require("tiny");
var _ = require("lodash");
var async = require("async");
var Promise = require("promise");
var Product = require("../../database/models/product/model"),
    Details = require("../../database/models/details/model"),
    Nutritional = require("../../database/models/nutritional/model"),
    Brand = require("../../database/models/brand/model"),
    Country = require("../../database/models/country/model");

function createProduct(data){
    return new Promise(function(resolve, reject){
        var nutritional = new Nutritional(data.details.nutritional);
        var saveDetailsAndProduct = function(){
            data.details.nutritional = nutritional;
            var _details = new Details(data.details);
            _details.save(function(err){
                if(err){
                    reject(err);
                } else {
                    data.details = _details;
                    var _product = new Product(data);
                    _product.save(function(err){
                        if(err){
                            reject(err);
                        } else {
                            nutritional.product = _product;
                            nutritional.save(function(err){
                                if(err){
                                    reject(err)
                                } else {
                                    resolve(_product);
                                }
                            });
                        }
                    });
                }
            });
        };
        var saveCountry = function(){
            return new Promise(function(resolve, reject){
                if(data.details.country){
                    Country.find({name: data.details.country}, function(err, country){
                        if(err){
                            reject(err);
                        } else {
                            if(country){
                                data.details.country = country._id;
                                resolve();
                            } else {
                                country = new Country(data.details.country);
                                country.save(function(err){
                                    if(err){
                                        reject(err);
                                    } else {
                                        data.details.country = country._id;
                                        resolve();
                                    }
                                });
                            }
                        }
                    });
                }else{
                    resolve();
                }
            });
        };
        var saveNutritional = function(){
            nutritional.save(function(err){
                if(err){
                    reject(err);
                } else {
                    saveDetailsAndProduct();
                }
            });
        };
        if(data.details.brand){
            Brand.find({name: data.details.brand}, function(err, brand){
                if(err){
                    reject(err);
                }else{
                    if(brand){
                        data.details.brand = brand._id;
                        saveCountry().then(function(){
                            saveNutritional();
                        }, reject);
                    } else {
                        brand = new Brand(data.details.brand);
                        brand.save(function(err){
                            if(err){
                                reject(err);
                            } else {
                                saveCountry().then(function(){
                                    saveNutritional();
                                }, reject);
                            }
                        });
                    }
                }
            })
        } else {
            saveCountry().then(function(){
                saveNutritional();
            }, reject);
        }
    });
}

function updateProduct(data){
    return new Promise(function(resolve, reject){
        Nutritional.findById(data.details.nutritional._id, function(err, nutritional){
            if(err){
                reject(err);
            } else {
                nutritional.fat = data.details.nutritional.fat;
                nutritional.protein = data.details.nutritional.protein;
                nutritional.caloric = data.details.nutritional.caloric;
                nutritional.carbohydrates = data.details.nutritional.carbohydrates;
                nutritional.save(function(err){
                    if(err){
                        reject(err);
                    } else {
                        var saveDetails = function(data){
                            var id = data.details._id;
                            delete data.details.__v;
                            delete data.details.__id;
                            Details.where({_id: id}).update(data.details, function(err){
                                if(err){
                                    console.error("Problem with update details ", err);
                                    reject(err);
                                } else {
                                    data.details = id;
                                    Product.findById(data._id, function(err, product){
                                        product.update(data, function(err){
                                            if(err){
                                                console.error("Problem with update product ", err);
                                                reject(err);
                                            } else {
                                                resolve(product);
                                            }
                                        });
                                    });
                                }
                            });
                        };
                        var saveCountry = function(data){
                            var country = data.details.country;
                            if(country){
                                var _id = country._id;
                                if(_id){
                                    delete country._id;
                                    Country.where({_id: _id}).setOptions({overwrite: true}).update(data.details.country, function(err){
                                        if(err){
                                            console.error("Error with update country");
                                            reject(err);
                                        } else {
                                            data.details.country = _id;
                                            saveDetails(data);
                                        }
                                    });
                                } else {
                                    var countryModel = new Country(country);
                                    countryModel.save(function(err){
                                        if(err){
                                            reject(err);
                                        } else {
                                            data.details.country = countryModel._id;
                                            saveDetails(data);
                                        }
                                    });
                                }
                            } else {
                                saveDetails(data);
                            }
                        };
                        data.details.nutritional = nutritional._id;
                        if(data.details.brand){
                            var _id = data.details.brand._id;
                            var brand = data.details.brand;
                            delete brand._id;
                            if(_id){
                                Brand.where({_id: _id}).setOptions({overwrite: true}).update(brand, function(err){
                                    if(err){
                                        console.error("Problem with update brand", err);
                                        reject(err);
                                    } else {
                                        data.details.brand = _id;
                                        saveCountry(data);
                                    }
                                });
                            } else {
                                var brand = new Brand(data.details.brand);
                                brand.save(function(err){
                                    if(err){
                                        reject(err);
                                    } else {
                                        data.details.brand = brand._id;
                                        saveCountry(data);
                                    }
                                })
                            }
                        } else {
                            saveCountry(data);
                        }
                    }
                });
            }
        });
    });
}

function saveImage(productId, info){
    return new Promise(function(resolve, reject){
        Product.findOne({_id: productId}, function(err, product){
            if(err){
                console.error("Error with find product :", err);
                reject(err);
            } else {
                product.setImage(info, function(err, product){
                    if(err){
                        console.log("Error with set image ", err);
                        reject(err);
                    } else {
                        resolve(product);
                    }
                });
            }
        });
    });
}

function deleteImage(productId, name){
    return new Promise(function(resolve, reject) {
        Product.findOne({_id: productId}, function (err, product) {
            if (err) {
                console.error("Error with find product ", err);
                reject(err);
            } else {
                product.deleteImage(name, function (err, product) {
                    if (err) {
                        console.error("Error with delete image ", err);
                        reject(err);
                    } else {
                        resolve(product);
                    }
                })
            }
        });
    });
}

var routes = {};

routes.get = {
    "/product/tmp/:ean": function(req, res, next){
        var ean = req.param("ean");
        Tiny("./database/temp/products.tiny", function(err, db) {
            if (err) {
                console.error("Problem with open db ", err);
                next(err);
            } else {
                db.get(ean, function(err, data){
                    if(err){
                        console.error("Error with get tmp product", err);
                        next(err);
                    } else {
                        if(data && !data.product){
                            data = undefined;
                        }
                        res.status(200).send({
                            status: "success",
                            data: data
                        }).end();
                        db.close();
                    }
                });
            }
        });
    },
    "/products/tmp": function(req, res, next){
        var options = {};
        var offset = req.param("offset") || 0;
        var ean = req.param("ean");
        if(ean){
            options.ean = ean;
        }
        Tiny("./database/temp/products.tiny", function(err, db) {
            if(err){
                console.error("Problem with open db ", err);
                next(err);
            } else {
                db.find(options).skip(offset).limit(25)(function(err, results){
                    if(err){
                        console.error("Problem with get tmp product, ", err);
                        next(err);
                    } else {
                        db.find(options).count()(function(err, count){
                            if(err){
                                console.log("Error with get all temp products", err);
                                next(err);
                            } else {
                                results = _.filter(results, function(result){
                                    if(!result.product){
                                        count--;
                                        return false;
                                    }
                                    return true;
                                });
                                res.status(200).json({
                                    status: "success",
                                    data: {
                                        requests: results,
                                        total: count
                                    }
                                }).end();
                                db.close();
                            }
                        });
                    }
                });
            }
        });
    },
    "/products/:id": function(req, res, next){
        var id = req.param("id");
        Product.findById(id).
            populate("details").
            populate("prices").
            exec(function(err, product){
                if(err){
                    console.error("Error with get product by id ", err);
                    next(err);
                } else {
                    product.details.populate("nutritional brand country prices", function(err){
                        if(err){
                            console.error("Problem with populate nutritional, brand, country by ean ", err);
                            next(err);
                        } else {
                            var options = {
                                path: "prices.shop",
                                model: "Shop"
                            };
                            Product.populate(product, options, function(err){
                                if(err){
                                    console.log("Problem with populate prices shop");
                                    next(err);
                                } else {
                                    res.status(200).send({
                                        status: "success",
                                        data: product
                                    });
                                }
                            });
                        }
                    });
                }
            });
    },
    "/products":  function(req, res, next){
        var full = req.param("full");
        var _id = req.param("_id");
        var ean = req.param("ean");
        var name = req.param("name");
        var family = req.param("family");
        var market = req.param("market");
        var section = req.param("section");
        var category = req.param("category");
        var offset = req.param("offset");
        var limit = req.param("limit");
        var query = {};
        var options = {
            limit: limit || 25,
            skip: offset || 0
        };
        if(_id){
            query._id = _id;
        }
        if(ean){
            query.ean = ean;
        }
        if(family){
            query.family = family;
        }
        if(market){
            query.market = market;
        }
        if(section){
            query.section = section;
        }
        if(category){
            query.category = category;
        }
        if(name){
            query.name = name;
        }
        Product.find(query).
            skip(options.skip).
            limit(options.limit).
            populate("details").
            populate("prices").
            exec(function(err, products){
                if(err){
                    console.error("Problem with find product by ean ", err);
                    next(err);
                } else {
                    var fn = function(){
                        Product.count(query, function(err, total){
                            if(err){
                                console.error("Error with counting products ", err);
                                next(new Error("Error with counting products"));
                            } else {
                                res.status(200).send({
                                    status: "success",
                                    data: {
                                        products:products,
                                        total: total
                                    }
                                }).end();
                            }
                        });
                    };
                    if(full){
                        async.eachSeries(products, function(product, cb){
                            product.details.populate("nutritional brand country prices", function(err){
                                if(err){
                                    console.error("Problem with populate nutritional, brand, country by ean ", err);
                                    cb(err);
                                } else {
                                    var options = {
                                        path: "prices.shop",
                                        model: "Shop"
                                    };
                                    Product.populate(product, options, function(err){
                                        if(err){
                                            console.log("Problem with populate prices shop");
                                            cb(err);
                                        } else {
                                            cb(null)
                                        }
                                    });
                                }
                            });
                        }, function(err){
                            if(err){
                                next(err);
                            } else {
                                fn();
                            }
                        });
                    } else {
                        fn();
                    }
                }
            });
    }
};

routes.post = {
    "/products/image": function(req, res, next){
        if(req.session.permissions > 1) {
            var image = req.files.image;
            var imageName = req.param("imageName");
            var _id = req.param("_id");
            saveImage(_id, {image: image, name: imageName}).then(function(product){
                res.status(200).json({status: "success", data: product.images});
            }, function(err){
                console.log("Error with save image ", err);
                next(err);
            });
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")}).end();
        }
    },
    "/products/tmp/image": function(req, res, next){
        if(req.session.permissions > 0) {
            var image = req.files.image;
            var _id = req.param("id");
            var imageName = req.param("imageName");
            console.log("/product/temp/images, eans -", req.param("eans"));
            var eans = req.param("eans").join();
            saveImage(_id, {image: image, name: imageName, temp: true}).then(function(product){
               Tiny("database/temp/products.tiny", function(err, db){
                    db.update(eans, {images: product.images}, function(err){
                        if(err){
                            console.error("Error with updateTiny db ", err);
                            next(err);
                        } else {
                            res.status(200).json({status: "success", data: product.images}).end();
                            db.close();
                        }
                    });
                });
            }, function(err){
                console.log("Error with save image ", err);
                next(err);
            });
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")}).end();
        }
    },
    "/products/tmp":  function(req, res, next){
        var files = req.files;
        var ean = req.param("ean").split(",")[0];
        var data = {
            product: {
                _id: req.param("_id"),
                ean: req.param("ean"),
                name: req.param("name"),
                details: JSON.parse(req.param("details")),
                category: req.param("category"),
                market: req.param("market"),
                section: req.param("section"),
                family: req.param("family"),
                status: req.param("status")
            },
            user: req.session.user,
            date: Date.now()
        };
        console.log("details ", data.product.details);
        var files_arr = [];
        for(var i in files){
            files_arr.push(files[i]);
        }
        if(req.session.permissions > 0){
            var product = data.product;
            var fn = function(){
                Tiny("database/temp/products.tiny", function(err, db){
                    db.set(ean, data, function(err){
                        if(err){
                            console.error("Problem with set temp product ", err);
                            next(err);
                        } else {
                            res.status(200).json({status: "success", data: product}).end();
                            db.close(function(err){
                                if(err)console.error("Error with close tiny db ", err);
                            });
                        }
                    });
                });
            }
            if(product._id){
                async.eachSeries(files_arr, function(file, cb){
                    saveImage(data.product._id, {image: file, name: file.fieldname, temp: true}).then(function(productModel){
                        product = productModel;
                        cb(null);
                    }, function(err){
                        cb(err);
                    });
                }, function(err){
                    if(err){
                        next(err);
                    } else {
                        fn();
                    }
                });
            } else {
                fn();
            }
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")})
        }
    },
    "/products":  function(req, res, next){
        var files = req.files;
        var details = JSON.parse(req.param("details"));
        var data = {
            ean: req.param("ean"),
            name: req.param("name"),
            category: req.param("category"),
            details: details,
            market: req.param("market"),
            section: req.param("section"),
            family: req.param("family"),
            status: req.param("status")
        };
        var files_arr = [];
        for(var i in files){
            files_arr.push(files[i]);
        }
        if(req.session.permissions > 1){
            createProduct(data).then(function(product){
                async.eachSeries(files_arr, function(file, cb){
                    saveImage(product._id, {image: file, name: file.fieldname}).then(function(productModel){
                        product = productModel;
                        cb(null);
                    }, function(err){
                        cb(err);
                    });
                }, function(err){
                    if(err){
                        next(err);
                    } else {
                        console
                        res.status(200).json({status: "success", data:product}).end();
                    }
                });
            }, function(err){next(err);})
        } else {
            res.status(200).json({status: "fail", error: {message: "You don't have a permissions"}}).end();
        }
    }
};

routes.put = {
    "/products/tmp/:ean":  function(req, res, next){
        var files = req.files;
        var ean = req.param("ean").split(",")[0]
        var data = {
            product:{
                _id: req.param("_id"),
                ean: req.param("ean"),
                name: req.param("name"),
                details: JSON.parse(req.param("details")),
                category: req.param("category"),
                market: req.param("market"),
                section: req.param("section"),
                family: req.param("family"),
                status: req.param("status")
            }
        };
        var files_arr = [];
        for(var i in files){
            files_arr.push(files[i]);
        }
        if(req.session.permissions  > 0){
            var product = data.product;
            var fn = function(){
                Tiny("database/temp/products.tiny", function(err, db){
                    //data.product.images = product.images;
                    db.update(ean, data, function(err){
                        if(err){
                            console.error("Problem with set temp product ", err);
                            next(err);
                        } else {
                            res.status(200).json({status: "success", data:product}).end();
                            db.close();
                        }
                    });
                });
            };
            if(data.product._id){
                async.eachSeries(files_arr, function(file, cb){
                    saveImage(data.product._id, {image: file, name: file.fieldname, temp: true}).then(function(productModel){
                        product = productModel;
                        cb(null);
                    }, function(err){
                        cb(err);
                    });
                }, function(err){
                    if(err){
                        next(err);
                    } else {
                        fn();
                    }
                });
            } else {
                fn();
            }
        } else {
            res.status(403).json({status: "fail", error: "You don't have a permissions"}).end();
        }
    },
    "/products/temp/accept":function(req, res, next){
        var ean = req.param("ean").split(",")[0];
        if(req.session.permissions > 1){
           Tiny("database/temp/products.tiny", function(err, db){
                db.get(ean, function(err, result){
                    if(err){
                        console.error("Problem with get temp product fromTiny db :", err);
                        next(err);
                    } else {
                        var fn = function(product){
                            product.acceptImages(function(err){
                                if(err){
                                    next(err);
                                } else {
                                    res.status(200).json({status: "success", data: product}).end();
                                    db.remove(ean, function(err){
                                        console.log("remove ", ean);
                                        if(err){
                                            console.info("Problem with remove temp product from temp db : ", err);
                                        }
                                        db.close();
                                    });
                                }
                            });
                        };
                        if(result.product._id){
                            console.log("update product ", result.product);
                            updateProduct(result.product).then(function(product){
                                fn(product);
                            }, function(err){
                                next(err);
                            });
                        } else {
                            console.log("create product ", result.product);
                            createProduct(result.product).then(function(product){
                                fn(product);
                            }, function(err){
                                next(err);
                            });
                        }
                    }
                });
            });
        } else {
            res.status(200).json({status: "fail", error: {message: "You don't have a permissions" }}).end();
        }
    },
    "/products/:id":  function(req, res, next){
        var files = req.files;
        var id = req.param("id");
        var data = {
            _id: id,
            ean: req.param("ean"),
            name: req.param("name"),
            details: JSON.parse(req.param("details")),
            category: req.param("category"),
            market: req.param("market"),
            section: req.param("section"),
            family: req.param("family"),
            status: req.param("status")
        };
        var files_arr = [];
        for(var i in files){
            files_arr.push(files[i]);
        }
        if(req.session.permissions > 1){
            updateProduct(data).then(function(product){
                if(files_arr.length == 0){
                    res.status(200).json({status: "success", data: product}).end();
                } else {
                    async.eachSeries(files_arr, function(file, cb){
                        saveImage(product._id, {image: file, name: file.fieldname}).then(function(productModel){
                            product = productModel;
                            cb(null);
                        }, function(err){
                            cb(err);
                        });
                    }, function(err){
                        if(err){
                            next(err);
                        } else {
                            res.status(200).json({status: "success", data:product}).end();
                        }
                    });
                }
            }, function(err){
                next(err);
            });
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")}).end();
        }
    },
    "/product/temp/image/accept": function(req, res, next){
        if(req.session.permissions > 1) {
            var _id = req.param("_id");
            var name = req.param(name);
            Product.findOne({_id: _id}, function (err, product) {
                if (err) {
                    console.error("Error with find product ", product);
                    next(err);
                } else {
                    product.acceptImage(name, function (err) {
                        if (err) {
                            console.error("Error with acceptImage ", err);
                            next(err);
                        } else {
                            res.status(200).json({status: "success", data: product}).end();
                        }
                    });
                }
            });
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")}).end();
        }
    }
};

routes.del = {
    "/product/image": function(req, res, next){
        if(req.session.permissions > 1){
            var _id = req.param("_id");
            var name = req.param("name");
            deleteImage(_id, name).then(function(){
                res.status(200).json({status: "success"});
            }, function(err){
                console.error("Error with delete image ", err);
                next(err);
            });
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")}).end();
        }
    },
    "product/temp/image": function(req, res, next){
        if(req.session.permissions > 1) {
            var _id = req.param("_id");
            var eans = req.param("eans").join();
            var name = req.param("name");
            deleteImage(_id, name).then(function (product) {
               Tiny("database/temp/products.tiny", function (err, db) {
                    db.update(eans, {images: product.images}, function (err) {
                        if(err){
                            console.error("Error with update temp product ", err);
                            next(err);
                        } else {
                            db.close();
                            res.status(200).json({status: "success"}).end();
                        }
                    });
                });
            }, function (err) {
                console.error("Error with updateTiny db ", err);
                next(err);
            });
        } else {
            res.status(200).json({status: "fail", error: new Error("You don't have a permissions")}).end();
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

