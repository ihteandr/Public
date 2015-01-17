define(["Class"],function(Class){
    var LoginService = Class.extend({
        $http: null,
        init: function(http, $q){
            this.$http = http;
            this.$q = $q;
        },
        tryLogin: function(data){
            var deferred = this.$q.defer();
            var config =  {
                headers: {
                    "content-type":"application/json"
                }
            };
            this.$http.post("/login", data, config).success(function(response){
                deferred.resolve(response);
            }).error(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }
    });

    LoginService.$inject = ["$http", "$q"];
    return LoginService;
});