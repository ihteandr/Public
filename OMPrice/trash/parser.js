function saveProducts(products, callback){
    var count = products.length;
    var db_products = [];
    for(var p = 0, p_len = products.length; p < p_len; p++){
        var product = products[p];
        var details = product.details;
        var nutritional = new Nutritional(details.nutritional);
        Product.findOne({eans: {$elemMatch: product.eans}}, function(err, data){
            console.log("INIT PRODUCTS", Math.round((++COUNT_PRODUCTS)/TOTAL_PRODUCTS * 100),"%");
            count--;
            if(!data){
                nutritional.save(function(err){
                    if(err){
                        console.error("Error with save nutritional ", err);
                        callback(err);
                    } else {
                        details.nutritional = nutritional;
                        var _details = new Details(details);
                        _details.save(function(err){
                            if(err){
                                console.error("Error with save details ", err);
                                callback(err);
                            } else {
                                product.details = _details;
                                var _product = new Product(product);
                                _product.save(function(err){
                                    if(err){
                                        console.error("Error with save product ", err);
                                        callback(err);
                                    } else {
                                        nutritional.product = _product;
                                        nutritional.save(function(err){
                                            if(err){
                                                console.log("Error with save nutritional with product_id ", err);
                                                callback(err)
                                            } else {
                                                console.log("SAVE PRODUCT ", _product);
                                                db_products.push(_product._id);
                                                if(count == 0){
                                                    callback(null, db_products);
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else if(count == 0){
                callback(null, db_products);
            }
        });
    }
}

function saveFamilies(families, callback){
    var count = families.length;
    var db_families = [];
    for(var f = 0, f_len = families.length; f< f_len; f++){
        var family = families[f];
        saveProducts(family.products, function(err, products){
            if(err){
                console.error("Error with save products ", err);
                callback(err);
            } else {
                Family.findOne({ id:family.id }, function(err, data){
                    count--;
                    var _family;
                    if(data){
                        _family = data;
                        _family.products = _.uniq(_family.products, products);
                    } else {
                        family.products = products;
                        _family = new Family(family);
                        db_families.push(_family._id);
                    }
                    _family.save(function(err){
                        if(err){
                            console.error("Error with save family ", err);
                            callback(err);
                        } else {
                            console.log("INIT FAMILIES ", Math.round((++COUNT_FAMILIES)/TOTAL_FAMILIES * 100),"%");
                            if(count == 0){
                                callback(null, db_families);
                            }
                        }
                    });
                });
            }
        });
    }
}

function saveCategories(categories, callback){
    var count = categories.length;
    var db_categories = [];
    for(var c = 0, c_len=categories.length; c < c_len; c++){
        var category = categories[c];
        saveFamilies(category.families, function(err, families){
            if(err){
                console.error("Error with save families ", err);
                callback(err);
            } else {
                Category.findOne({id: category.id}, function(err, data){
                    count--;
                    var _category;
                    if(data){
                        _category = data;
                        _category.families = _.uniq(_category.families, families);
                    } else {
                        category.families = families;
                        _category = new Category(category);
                        db_categories.push(_category._id);
                    }
                    _category.save(function(err){
                        if(err){
                            console.error("Error with save category ", err);
                            callback(err);
                        } else {
                            console.log("Category saved ", _category);
                            console.log("INIT CATEGORIES", Math.round((++COUNT_CATEGORIES)/TOTAL_CATEGORIES * 100),"%");
                            if(count == 0){
                                callback(null, db_categories);
                            }
                        }
                    });
                });
            }
        });
    }
}

function saveSections(sections, callback){
    var count = sections.length;
    var db_sections = [];
    for(var s = 0, s_len = sections.length; s < s_len; s++){
        var section = sections[s];
        saveCategories(section.categories, function(err, categories){
            if(err){
                console.error("Error with save categories ", err);
                callback(err);
            } else {
                Section.findOne({id: section.id}, function(err, data){
                    count--;
                    var _section;
                    if(data){
                        _section = data;
                        _section.categories = _.uniq(_section.categories, categories);
                    } else {
                        section.categories = categories;
                        _section = new Section(section._id);
                        db_sections.push(_section);
                    }
                    _section.save(function(err){
                        if(err){
                            console.error("Error with save section ", err);
                            callback(err);
                        } else {
                            console.log("INIT SECTIONS", Math.round((++COUNT_SECTIONS)/TOTAL_SECTIONS * 100),"%");
                            if(count == 0){
                                callback(null, db_sections);
                            }
                        }
                    });
                });
            }
        });
    }
}

function saveMarkets(markets, callback){
    var count = markets.length;
    for(var m = 0, m_len = markets.length; m < m_len; m ++){
        var market = markets[m];
        saveSections(market.sections, function(err, sections){
            if(err){
                console.error("Error with save sections ", err);
                callback(err);
            } else {
                Market.find({id: market.id}, function(err, data){
                    count--;
                    var _market;
                    if(data){
                        console.log("init market by data ", data);
                        _market = data;
                        _market.sections = _.uniq(_market.sections, sections);
                    } else {
                        market.sections = sections;
                        _market = new Market(market);
                    }
                    _market.save(function(err){
                        if(err){
                            console.error("Error with save market ", err);
                            callback(err);
                        } else {
                            console.log("Market saved ", _market);
                            console.log("INIT MARKETS", Math.round((++COUNT_MARKETS)/TOTAL_MARKETS * 100),"%");
                            if(count == 0){
                                callback(null);
                            }
                        }
                    });
                });
            }
        });
    }
}
