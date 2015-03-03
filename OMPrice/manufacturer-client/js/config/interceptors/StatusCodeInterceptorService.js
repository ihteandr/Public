define(["jquery", "Class"], function($, Class){
    var StatusCodeInterceptorService = Class.extend({
        $q: null,
        init: function($q){
            this.$q = $q;
            this.request = this.request.bind(this);
            this.requestError = this.requestError.bind(this);
            this.response = this.response.bind(this);
            this.responseError = this.responseError.bind(this);
        },
        handleError: function(err){
            var message;
            if(err.error){
                if(err.error.message){
                    message = err.error.message;
                } else {
                    message = err.error;
                }
            } else {
                message = err;
            }
            require(["BootstrapGrowl"], function(){
                $.growl({
                    message: message
                },{
                    type: 'danger'
                });
            });
        },
        request: function(config){
            if(window.App && window.App.user){
                var suffix = "&user=" + App.user._id;
                if(config.url.indexOf("?") == -1){
                    config.url += "?"
                }
                config.url += suffix;

            }
            return config;
        },
        requestError: function(rejection){
            return this.$q.reject(rejection);
        },
        response: function(response){
            return response;
        },
        responseError: function(rejection){
            this.handleError(rejection.data);

            if(rejection.status == "401"){
                console.log("rejection ", rejection);//window.location.reload();
            }
            return this.$q.reject(rejection);
        }
    });
    StatusCodeInterceptorService.$inject = ["$q"];
    return ["$q", function($q){
        return new StatusCodeInterceptorService($q)
    }];
});