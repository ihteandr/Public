define(['Class', 'BaseModel'], function(Class, BaseModel){
    var ProductInfoModel = BaseModel.extend({
        _service: null,
        isNew: false,
        init: function(){
        },
        fetchSections: function(){
            var self = this;
            return this._service.getSections(this.storage.currentProduct.market).then(function(results){
                self.storage.sections = results;
                var section = _.find(self.storage.sections, function(section){
                    return section._id == self.storage.currentProduct.section;
                });
                if(!section){
                    self.storage.currentProduct.section = "";
                    self.storage.currentProduct.category = "";
                    self.storage.currentProduct.family = "";
                }
            });
        },
        fetchCategories: function(){
            var self = this;
            if(this.storage.currentProduct.section == ""){
                this.storage.categories = [];
                this.storage.currentProduct.family = "";
            }
            return this._service.getCategories(this.storage.currentProduct.section).then(function(results){
                self.storage.categories = results;
                var category = _.find(self.storage.categories, function(category){
                    return category._id == self.storage.currentProduct.category;
                });
                if(!category){
                    self.storage.currentProduct.category = "";
                    self.storage.currentProduct.family = "";
                }
            });
        },
        fetchFamilies: function(){
            var self = this;
            if(this.storage.currentProduct.category == ""){
                this.storage.families = [];
            }
            this._service.getFamilies(this.storage.currentProduct.category).then(function(results){
                self.storage.families = results;
            });
        },

        fetchMarkets: function(){
            var self = this;
            return this._service.getMarkets().then(function(markets){
                self.storage.markets = markets;
            });
        },

        fetchTmpProduct: function(ean){
            var self = this;
            return this._service.getTmpProduct(ean || this.storage.product.ean).then(function(data){
                if(data){
                    self.storage.tmpProduct = data.product;
                } else {
                    self.storage.tmpProduct = {};
                    self.isNew = true;
                }
            });
        },

        fetchProduct: function(query){
            var self = this;
            return this._service.getProduct(query).then(function(product){
                self.storage.product = product || {};
            });
        },

        fetchCountries: function(){
            var self = this;
            return this._service.getCountries().then(function(results){
                self.storage.countries = results;
            });
        },

        fetchBrands: function(){
            var self = this;
            return this._service.getBrands().then(function(results){
                self.storage.brands = results;
            });
        },

        fetchBulkUnits: function(){
            var self = this;
            return this._service.getBulkUnits().then(function(results){
                self.storage.bulkUnits = results;
            });
        },

        save: function(){
            var tmpEans = [],
                eans = [];
            if(this.get("tmpProduct").ean){
                tmpEans = this.get("tmpProduct").ean.split(",");
            }
            if(this.get("product").ean){
                eans = this.get("product").ean.split(",");
            }
            var product = _.clone(this.get("currentProduct"), true);
            product.ean = _.union(eans, tmpEans).join(",");
            console.log("new images ", this.get("newImages"));
            return this._service.saveProduct({
                product: product,
                newImages: this.storage.newImages
            }, this.isNew);
        }
    });

    var ProductInfoModelProvider = Class.extend({
        instance: new ProductInfoModel(),

        $get: ["ProductInfoService", function(ProductInfoService, $q){
            this.instance._service = ProductInfoService;
            return this.instance;
        }]
    });

    return ProductInfoModelProvider;
});