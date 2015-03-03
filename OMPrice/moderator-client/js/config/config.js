define([], function(){
    var setup = function(module){
        module.config(["$httpProvider", function($httpProvider){
            var interceptor = ["$q", function($q){
                function request(config){
                    if(window.App && window.App.user){
                        var suffix = "&user=" + App.user._id;
                        if(config.url.indexOf("?") == -1){
                            config.url += "?"
                        }
                        config.url += suffix;

                    }
                    return config;
                }
                function requestError(rejection){
                    return $q.reject(rejection);
                }
                function response(response){
                    return response;
                }
                function responseError(rejection){
                    if(rejection.status == "401"){
                        window.location.reload();
                    }
                    return $q.reject(rejection);
                }
                return {
                    request: request,
                    requestError: requestError,
                    response: response,
                    responseError: responseError
                };
            }];
            $httpProvider.interceptors.push(interceptor);
        }]);
    };

    return {
        setup: setup
    };
});