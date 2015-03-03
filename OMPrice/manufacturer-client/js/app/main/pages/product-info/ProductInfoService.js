define(["Class"], function(Class){
    var ProductInfoService = Class.extend({
        $http: null,
        $q: null,
        init: function(http, q){
            this.$http = http;
            this.$q = q;
        },
        _doRequest: function(path, data){
            var deferred = this.$q.defer();
            this.$http.get(path, {params: data}).success(function(response){
                if(response.status == "success"){
                    var data;
                    if(response.data && response.data.products){
                        data = response.data.products;
                    } else {
                        data = response.data;
                    }
                    deferred.resolve(data);
                } else {
                    deferred.reject(response);
                }
            }).error(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        },

        getProduct: function(data){
            var path,
                options = {
                    full: true
                };
            if(data._id){
                path =  "/products/" + data._id;
            } else {
                path = "/products";
                if(data.ean){
                    options.ean = data.ean;
                } else {
                    options.name = data.name;
                }
            }
            return this._doRequest(path, options);
        },

        getTmpProduct: function(ean){
            return this._doRequest("/product/tmp/" + ean);
        },

        getMarkets: function(){
            return this._doRequest("/markets");
        },

        getSections: function(market){
            var deferred = this.$q.defer();
            var self = this;
            this.getSections.timeout && clearTimeout(this.getSections.timeout);
            this.getSections.timeout = setTimeout(function(){
                self._doRequest("/sections", {market: market}).then(deferred.resolve, deferred.reject);
                clearTimeout(self.getSections.timeout);
            }, 500);
            return deferred.promise;
        },

        getCategories: function(section){
            var deferred = this.$q.defer();
            var self = this;
            this.getCategories.timeout && clearTimeout(this.getCategories.timeout);
            if(section){
                this.getCategories.timeout = setTimeout(function(){
                    self._doRequest("/categories", {section: section}).then(deferred.resolve, deferred.reject);
                    clearTimeout(self.getCategories.timeout);
                }, 500);
            } else {
                deferred.resolve([]);
            }
            return deferred.promise;
        },

        getFamilies: function(category){
            var deferred = this.$q.defer();
            var self = this;
            this.getFamilies.timeout && clearTimeout(this.getFamilies.timeout);
            if(category){
                this.getFamilies.timeout = setTimeout(function(){
                    self._doRequest("/families", {category: category}).then(deferred.resolve, deferred.reject);
                    clearTimeout(self.getFamilies.timeout);
                }, 500);
            } else {
                deferred.resolve([]);
            }
            return deferred.promise;
        },

        getCountries: function(){
            return this._doRequest("/countries", {full: true});
        },

        getBrands: function(){
            return this._doRequest("/brands");
        },

        getBulkUnits: function(){
            return this._doRequest("/bulkUnits");
        },

        saveProduct: function(data, isNew){
            var product = data.product;
            var images = data.newImages;
            var query = {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            };
            var formData = new FormData();
            if(isNew){
                query.url = "/products/tmp";
                query.method = "POST";
            } else {
                query.url = "/products/tmp/" + product.ean;
                query.method= "PUT";
            }
            for(var i in images){
                formData.append("file" + i, images[i].file, "file" + i);
            }
            if(product._id && product._id != "undefined"){
                formData.append("_id", product._id);
            }
            if(product.name && product.name != "undefined"){
                formData.append("name", product.name);
            }
            formData.append("category", product.category);
            formData.append("details", JSON.stringify(product.details));
            formData.append("ean", product.ean);
            formData.append("family", product.family);
            formData.append("market", product.market);
            formData.append("section", product.section);
            if(product.status && product.status != "undefined"){
                formData.append("status", product.status);
            }
            query.data = formData;
            var deferred = this.$q.defer();
            this.$http(query).success(function(response){
                if(response.status == "success"){
                    deferred.resolve(response.data)
                } else {
                    deferred.reject(response);
                }
            }).error(deferred.reject);
            return deferred.promise;
        }
    });
    ProductInfoService.$inject = ["$http", "$q"];

    return ProductInfoService;
});