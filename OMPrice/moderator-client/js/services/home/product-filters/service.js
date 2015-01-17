define([], function(){
    return ["$http", "$q", function($http, $q){
        function doRequest(path){
            var deferred = $q.defer();
            $http.get(path)
                .success(function(response){
                    if(response.status == "success"){
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response);
                    }
                })
                .error(function(response){
                    deferred.reject(response);
                });
            return deferred.promise;
        }
        function getMarkets(){
            return doRequest("/markets");
        }

        function getSections(marketID){
            var deferred = $q.defer();
            getSections.timeout && clearTimeout(getSections.timeout);
            getSections.timeout = setTimeout(function(){
                doRequest("/sections?market=" + marketID).then(deferred.resolve, deferred.reject);
                clearTimeout(getSections.timeout);
            }, 500);
            return deferred.promise;
        }

        function getCategories(sectionID){
            var deferred = $q.defer();
            getCategories.timeout && clearTimeout(getCategories.timeout);
            getCategories.timeout = setTimeout(function(){
                doRequest("/categories?section=" + sectionID).then(deferred.resolve, deferred.reject);
                clearTimeout(getCategories.timeout);
            }, 500);
            return deferred.promise;
        }

        function getFamilies(categoryID){
            var deferred = $q.defer();
            getCategories.timeout && clearTimeout(getCategories.timeout);
            getCategories.timeout = setTimeout(function(){
                doRequest("/families?category=" + categoryID).then(deferred.resolve, deferred.reject);
                clearTimeout(getCategories.timeout);
            }, 500);
            return deferred.promise;
        }

        function getCountries(){
            return doRequest("/countries");
        }

        function getBrands(){
            return doRequest("/brands");
        }

        return {
            getMarkets: getMarkets,
            getSections: getSections,
            getCategories: getCategories,
            getFamilies: getFamilies,
            getCountries: getCountries,
            getBrands: getBrands
        };
    }];
});