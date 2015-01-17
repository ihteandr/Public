define([
    'jquery',
    'Lodash',
    'Angular',
    'config/config',
    'services/services',
    'directives/directives',
    'filters/filters',
    'controllers/controllers',
    "BootstrapGrowl"
], function ($, _, angular, config, services, directives, filters, controllers) {
    "use strict";

    var initialize = function () {
        window.App = {
            navigate: function(hash){
                window.location.hash = hash;
            },
            errorHandler: function(err){
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
                $.growl({
                    message: message
                },{
                    type: 'danger'
                });
            }
        };
        angular.module('myApp',['ngRoute']);
        var mainModule = angular.module('myApp');

        services.initialize(mainModule);
        controllers.initialize(mainModule);
        directives.initialize(mainModule);
        filters.initialize(mainModule);
        config.setup(mainModule);
        angular.bootstrap(document, ['myApp']);
    };

    return {
        initialize: initialize
    };
});
