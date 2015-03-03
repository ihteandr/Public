define([], function(){
    return ["$http", "$q", function($http, $q){
        function doRequest(path, data){
            var deferred = $q.defer();
            $http.get(path, {params: data}).success(function(response){
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
        }

        function getProduct(data){
            var path,
                options = {full: true};
            if(data._id){
                path = "/products/" + data._id;
            } else {
                path = "/products";
                if(data.ean){
                    options.ean = data.ean;
                } else {
                    options.name = data.name;
                }
            }
            return doRequest(path, options);
        }

        function getTmpProduct(ean){
            return doRequest("/product/tmp/" + ean);
        }

        function getMarkets(){
            return doRequest("/markets");
        }

        function getSections(market){
            var deferred = $q.defer();
            getSections.timeout && clearTimeout(getSections.timeout);
            getSections.timeout = setTimeout(function(){
                doRequest("/sections", {market: market}).then(deferred.resolve, deferred.reject);
                clearTimeout(getSections.timeout);
            }, 500);
            return deferred.promise;
        }

        function getCategories(section){
            var deferred = $q.defer();
            getCategories.timeout && clearTimeout(getCategories.timeout);
            getCategories.timeout = setTimeout(function(){
                doRequest("/categories", {section: section}).then(deferred.resolve, deferred.reject);
                clearTimeout(getCategories.timeout);
            }, 500);
            return deferred.promise;
        }

        function getFamilies(category){
            var deferred = $q.defer();
            getFamilies.timeout && clearTimeout(getFamilies.timeout);
            getFamilies.timeout = setTimeout(function(){
                doRequest("/families", {category: category}).then(deferred.resolve, deferred.reject);
                clearTimeout(getFamilies.timeout);
            }, 500);
            return deferred.promise;
        }

        function getCountries(){
            return doRequest("/countries", {full: true});
        }

        function getBrands(){
            return doRequest("/brands");
        }

        function getBulkUnits(){
            return doRequest("/bulkUnits");
        }

        function saveProduct(data, isRequest){
            var query;
            if(!isRequest){
                var product = data.product;
                var images = data.newImages;
                query = {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                };
                var formData = new FormData();
                if(product._id){
                    query.url = "/products/" + product._id;
                    query.method= "PUT";
                } else {
                    query.url = "/products";
                    query.method = "POST";
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
                for(var i in images){
                    formData.append("file" + i, images[i].file, "file" + i);
                }
                query.data = formData;
            } else {
                query = {
                    url: "/products/temp/accept",
                    data: {ean: data.product.ean},
                    method: "PUT"
                };
            }
            var deferred = $q.defer();
            $http(query).success(function(response){
                if(response.status == "success"){
                    deferred.resolve(response.data)
                } else {
                    deferred.reject(response);
                }
            }).error(deferred.reject);
            return deferred.promise;
        }

        return {
            getProduct: getProduct,
            getTmpProduct: getTmpProduct,
            getMarkets: getMarkets,
            getSections: getSections,
            getCategories: getCategories,
            getFamilies: getFamilies,
            getCountries: getCountries,
            getBrands: getBrands,
            getBulkUnits: getBulkUnits,
            saveProduct: saveProduct
        };
    }];
});