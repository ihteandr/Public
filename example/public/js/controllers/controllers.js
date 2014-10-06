define([
  // Standard Libs
    'Underscore', // lib/underscore/underscore

  // routing
    'routes/routes',

  // Application Controller
    'controllers/details/controller'
], function (_, routes, detailsController) {
    "use strict";

    var controllers = {
       details: detailsController
    };

    var setUpRoutes = function(angModule) {
        // hook up routing
        angModule.config(function($routeProvider){
            _.each(routes, function(value, key) {
                $routeProvider.when(
                    value.route,
                    {
                        template: value.template,
                        controller: value.controller,
                        title: value.title
                    }
                );
            });
            $routeProvider.otherwise({ redirectTo: "/details" });
        });
    };

    var initialize = function(angModule) {
        _.each(controllers,function(controller,name){
            angModule.controller(name, controller);
        });
        setUpRoutes(angModule);
    };


    return {
        initialize: initialize
    };
});
