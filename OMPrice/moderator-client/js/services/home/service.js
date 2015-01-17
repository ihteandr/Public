define([

], function(){
    return ["$http", "$q", function($http, $q){
        function getProductList(data){
            var deferred = $q.defer();
            getProductList.timeout && clearTimeout(getProductList.timeout);
            getProductList.timeout = setTimeout(function(){
                $http.get("/products", {params: data})
                    .success(function(response){
                        if(response.status == "success"){
                            deferred.resolve(response.data)
                        } else {
                            deferred.reject(response);
                        }
                    })
                    .error(function(response){
                        deferred.reject(response);
                    });
                clearTimeout(getProductList.timeout)
            }, 1000);
            return deferred.promise;
        }
        return {
            getProductList: getProductList
        };
    }]
});