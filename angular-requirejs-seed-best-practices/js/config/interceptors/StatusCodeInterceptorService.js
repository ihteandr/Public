define(["Class"], function(Class){
    var StatusCodeInterceptorService = Class.extend({
        $q: null,
        init: function($q){
            this.$q = $q;
        },
        request: function(config){
            return config;
        },
        requestError: function(rejection){
            return $q.reject(rejection);
        },
        response: function(response){
            if(response.status == "success"){
                return response.data;
            } else {
                return this.$q.reject(response.error);
            }
        },
        responseError: function(rejection){
            return this.$q.reject(rejection);
        }

    });
    StatusCodeInterceptorService.$inject = ["$q"];
    return StatusCodeInterceptorService;
});