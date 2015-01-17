define([
    'Lodash',
    "routes/routes",
    "controllers/main/controller",
    "controllers/main/header/controller",
    "controllers/main/pages/home/controller",
    "controllers/shared/modals/create/base/controller",
    "controllers/main/pages/product-info/controller"
], function ( _, routes, MainController, HeaderController, HomeController, BaseCreateController, ProductInfoController) {
    "use strict";

    var controllers = {
        headerController: HeaderController,
        appController: MainController,
        homeController: HomeController,
        baseCreateController: BaseCreateController,
        productInfoController: ProductInfoController
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
            $routeProvider.otherwise({ redirectTo: routes.home.route });
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
