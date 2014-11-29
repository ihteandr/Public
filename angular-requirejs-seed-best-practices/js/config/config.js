define([
    './interceptors/StatusCodeInterceptorService'
], function(StatusCodeInterceptorService){
    var setup = function(module){
        module.config(["$httpProvider", function($httpProvider){
            $httpProvider.interceptors.push(StatusCodeInterceptorService);
        }]);
    };

    return {
        setup: setup
    };
});