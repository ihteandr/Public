define([
    'jquery',
    'BaseController',
    'BootstrapGrowl',
    'Bootstrap'
], function($, BaseController){
    var ProductInfoController = BaseController.extend({
        _model: null,
        _spinService: null,
        $routeParams: null,
        $location: null,
        query: {},
        init: function(scope, $routeParams, $location, ProductInfoModel, SpinService){
            this._super(scope);
            var self = this;
            this._model = ProductInfoModel;
            this._spinService = SpinService;
            this.$location = $location;
            this._model.setStorage(this.$scope);
            this._model.storage.newImages = [];
            if($routeParams.idOrEanOrName){
                var idOrEanOrName = $routeParams.idOrEanOrName;
                var query = {};
                if(/^[\d,]+$/.test(idOrEanOrName)){
                    query.ean = idOrEanOrName;
                } else if(/^([a-z]|[0-9])+$/.test(idOrEanOrName)){
                    query._id = idOrEanOrName;
                } else {
                    query.name = idOrEanOrName;
                }
                setTimeout(function(){self._spinService.startSpin($("form.not-initialized")[0]);}, 200);
                this._model.fetchProduct(query).then(function(){
                    if(query.ean){
                        self._model.fetchTmpProduct(query.ean).then(function(){
                            self._spinService.stopSpin();
                            if(self._model.get("tmpProduct").ean){
                                self._model.set("currentProduct", self._model.get("tmpProduct"));
                            } else {
                                self._model.set("currentProduct", self._model.get("product"));
                            }
                            if(self._model.get("product")){
                                self._model.get("currentProduct").images = self._model.get("product").images;
                            }
                            if(!self._model.get("currecntProduct")){
                                self.$scope.notFound = true;
                            }
                        });
                    } else if(!self.$scope.product && !self.$scope.products){
                        self.$scope.notFound = true;
                    }
                });
            } else {
                this.$scope.product = {};
                this.$scope.isNew = true;
                this.$scope.tmpProduct = {};
                this.$scope.currentProduct = {
                    details: {
                        nutritional: {}
                    }
                };
                this._model.isNew = true;
            }
            this._model.fetchMarkets();
            this._model.fetchCountries();
            this._model.fetchBrands();
            this._model.fetchBulkUnits();
        },

        checkName: function(){
            if(this._model.get("tmpProduct").name &&
                (this._model.get("product").name != this._model.get("tmpProduct").name)){
                return true;
            }
            return false;
        },

        checkMarket: function(){
            if(this._model.get("tmpProduct").market &&
                (this._model.get("product").market != this._model.get("tmpProduct").market)){
                return true;
            }
            return false;
        },

        checkSection: function(){
            if(this._model.get("tmpProduct").section &&
                (this._model.get("product").section != this._model.get("tmpProduct").section)){
                return true;
            }
            return false;
        },

        checkCategory: function(){
            if(this._model.get("tmpProduct").category &&
                (this._model.get("product").category != this._model.get("tmpProduct").category)){
                return true;
            }
            return false;
        },

        checkFamily: function(){
            if(this._model.get("tmpProduct").family &&
                (this._model.get("product").family != this._model.get("tmpProduct").family)){
                return true;
            }
            return false;
        },

        checkDetailsBulk: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.bulk != this._model.get("tmpProduct").details.bulk)){
                return true;
            }
            return false;
        },

        checkDetailsBulkUnit: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.bulkUnit != this._model.get("tmpProduct").details.bulkUnit)){
                return true;
            }
            return false;
        },

        checkDetailsBrandName: function(){
            if(this._model.get("tmpProduct").details){
                if(!this._model.get("product").details.brand && !this._model.get("tmpProduct").details.brand){
                    return false;
                }
                if(!this._model.get("product").details.brand && this._model.get("tmpProduct").details.brand){
                    return true;
                }
                if(this._model.get("product").details.brand.name != this._model.get("tmpProduct").details.brand.name){
                    return true;
                }

            }
            return false;
        },

        checkDetailsManufacturer: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.manufacturer != this._model.get("tmpProduct").details.manufacturer)){
                return true;
            }
            return false;
        },

        checkDetailsCountry: function(){
            if(this._model.get("tmpProduct").details){
                if(!this._model.get("product").details.country && !this._model.get("tmpProduct").details.country){
                    return false;
                }
                if(!this._model.get("product").details.country && this._model.get("tmpProduct").details.country){
                    return true;
                }
                if(this._model.get("product").details.country._id != this._model.get("tmpProduct").details.country._id){
                    return true;
                }
            }
            return false;
        },

        checkDetailsAddress: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.address != this._model.get("tmpProduct").details.address)){
                return true;
            }
            return false;
        },

        checkDetailsWebsite: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.website != this._model.get("tmpProduct").details.website)){
                return true;
            }
            return false;
        },

        checkDetailsPhone: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.phone != this._model.get("tmpProduct").details.phone)){
                return true;
            }
            return false;
        },

        checkDetailsEmail: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.email != this._model.get("tmpProduct").details.email)){
                return true;
            }
            return false;
        },

        checkDetailsSummary: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.summary != this._model.get("tmpProduct").details.summary)){
                return true;
            }
            return false;
        },

        checkDetailsConsist: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.consist != this._model.get("tmpProduct").details.consist)){
                return true;
            }
            return false;
        },

        checkDetailsNutritionalFat: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.nutritional.fat != this._model.get("tmpProduct").details.nutritional.fat)){
                return true;
            }
            return false;
        },

        checkDetailsNutritionalProtein: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.nutritional.protein != this._model.get("tmpProduct").details.nutritional.protein)){
                return true;
            }
            return false;
        },

        checkDetailsNutritionalCarbohydrates: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.nutritional.carbohydrates != this._model.get("tmpProduct").details.nutritional.carbohydrates)){
                return true;
            }
            return false;
        },

        checkDetailsNutritionalCaloric: function(){
            if(this._model.get("tmpProduct").details &&
                (this._model.get("product").details.nutritional.caloric != this._model.get("tmpProduct").details.nutritional.caloric)){
                return true;
            }
            return false;
        },

        checkStatus: function(){
            if(this._model.get("tmpProduct").status &&
                (this._model.get("product").status != this._model.get("tmpProduct").status)){
                return true;
            }
            return false;
        },

        defineScope: function(){
            this.$scope.currentProduct = {
                isNotInitialized: true
            };
            this.$scope.checkName = this.checkName.bind(this);
            this.$scope.checkMarket = this.checkMarket.bind(this);
            this.$scope.checkSection = this.checkSection.bind(this);
            this.$scope.checkCategory = this.checkCategory.bind(this);
            this.$scope.checkFamily = this.checkFamily.bind(this);
            this.$scope.checkDetailsBulk = this.checkDetailsBulk.bind(this);
            this.$scope.checkDetailsBulkUnit = this.checkDetailsBulkUnit.bind(this);
            this.$scope.checkDetailsManufacturer = this.checkDetailsManufacturer.bind(this);
            this.$scope.checkDetailsCountry = this.checkDetailsCountry.bind(this);
            this.$scope.checkDetailsAddress = this.checkDetailsAddress.bind(this);
            this.$scope.checkDetailsWebsite = this.checkDetailsWebsite.bind(this);
            this.$scope.checkDetailsPhone = this.checkDetailsPhone.bind(this);
            this.$scope.checkDetailsEmail = this.checkDetailsEmail.bind(this);
            this.$scope.checkDetailsSummary = this.checkDetailsSummary.bind(this);
            this.$scope.checkDetailsConsist = this.checkDetailsConsist.bind(this);
            this.$scope.checkDetailsNutritionalCaloric = this.checkDetailsNutritionalCaloric.bind(this);
            this.$scope.checkDetailsNutritionalCarbohydrates = this.checkDetailsNutritionalCarbohydrates.bind(this);
            this.$scope.checkDetailsNutritionalProtein = this.checkDetailsNutritionalProtein.bind(this);
            this.$scope.checkDetailsNutritionalFat = this.checkDetailsNutritionalFat.bind(this);
            this.$scope.checkStatus = this.checkStatus.bind(this);
            this.$scope.submit = this.submit.bind(this);
            this.$scope.back = this.back.bind(this);
        },

        __handleMarketChange: function(newValue, oldValue){
            if(newValue !== oldValue){
                this._model.fetchSections();
                this._model.fetchCategories();
                this._model.fetchFamilies();
            }
        },

        __handleSectionChange: function(newValue, oldValue){
            if(newValue !== oldValue){
                this._model.fetchCategories();
                this._model.fetchFamilies();
            }
        },

        __handleCategoryChange: function(newValue, oldValue){
            if(newValue !== oldValue){
                this._model.fetchFamilies();
            }
        },

        defineListeners: function(){
            this._super();
            this.$scope.$watch("currentProduct.market", this.__handleMarketChange.bind(this));
            this.$scope.$watch("currentProduct.section", this.__handleSectionChange.bind(this));
            this.$scope.$watch("currentProduct.category", this.__handleCategoryChange.bind(this));
        },
        validate: function(){
            var validateFields = ["family", "section", "category", "market"],
                checker = true;
            if(!this._model.get("product").ean && !this._model.get("tmpProduct").ean){
                $("#" + validateFields[i]).addClass("error");
                checker = false;
            } else {
                $("#" + validateFields[i]).removeClass("error");
            }
            for(var i = 1, len = validateFields.length; i < len; i ++){
                if(!this._model.get("currentProduct")[validateFields[i]]){
                    $("#" + validateFields[i]).addClass("error");
                    checker = false;
                } else {
                    $("#" + validateFields[i]).removeClass("error");
                }
            }
            return checker;
        },
        submit: function(){
            var self = this;
            if(this.validate()){
                this._model.save().then(function(product){
                    if(product.images){
                        self._model.get("currentProduct").images = product.images;
                    }
                    self._model.set("newImages", []);
                    self._model.isNew = false;
                    self._model.storage.isNew = false;
                    self.$scope.$broadcast("resetUploader");
                    $.growl({
                        message: "Изменения Сохранены"
                    },{
                        type: 'success'
                    });
                });
            }
        },
        back: function(){
            this.$location.path("/home");
        }
    });
    ProductInfoController.$inject = ["$scope", "$routeParams", "$location", "ProductInfoModel", "SpinService"];

    return ProductInfoController;
});