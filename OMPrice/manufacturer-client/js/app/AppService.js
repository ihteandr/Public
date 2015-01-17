define(["Class"], function(Class){
    var AppService = Class.extend({
        $http: null,
        init: function($http, $q){
            this.$http = $http;
            this.$q = $q;
        },
        checkAuthorization: function(){
            var deferred = this.$q.defer();
            this.$http.post("/checkAuthorization").success(function(response){
                deferred.resolve(response);
            }).error(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }

    });

    AppService.$inject = ["$http", "$q"];
    return AppService;
});