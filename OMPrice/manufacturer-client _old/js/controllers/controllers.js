define([
    'Lodash',
    'routes/routes',
    'controllers/main/controller',
    'controllers/main/header/controller',
], function ( _, routes, MainController, HeaderController) {
    "use strict";

    var controllers = {
        headerController: HeaderController,
        appController: MainController
    };

    var setUpRoutes = function(angModule) {
        angModule.config(["$routeProvider", function($routeProvider){
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
        //$routeProvider.otherwise({ redirectTo: routes.login.route });
        }]);
        angModule.run(["$rootScope", function($rootScope){
            $rootScope.$on('$routeChangeSuccess',function (next,last) {
            });
        }]);
    }

    var initialize = function(angModule) {
        _.each(controllers,function(controller,name){
            angModule.controller(name, controller);
        })
        setUpRoutes(angModule);
    };


    return {
        initialize: initialize
    };
});
