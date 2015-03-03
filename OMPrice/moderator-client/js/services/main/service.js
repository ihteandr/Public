define([], function(){
    return ["$http", "$q", function($http, $q){
        var checkAuthorization = function(){
            var deferred = $q.defer();
            if(App.user){
                deferred.resolve(App.user);
            } else {
                deferred.resolve()
            }
//            $http.post("/checkAuthorization").success(function(response){
//                deferred.resolve(response);
//            }).error(function(response){
//                deferred.reject(response);
//            });
            return deferred.promise;
        };

        var tryLogin = function(data){
            var deferred = $q.defer();
            var config =  {
                headers: {
                    "content-type":"application/json"
                }
            };
            $http.post("/login", data, config).success(function(response){
                deferred.resolve(response);
            }).error(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        };
        return {
            checkAuthorization: checkAuthorization,
            tryLogin: tryLogin
        }
    }];
});