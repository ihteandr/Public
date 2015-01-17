define([
    "BaseRouter"
], function(BaseRouter){
    var Router = BaseRouter.extend({
        routes:{
            "/home": {
                templateUrl: "templates/main/pages/home/template.html",
                controller: "homeController",
                title: "Home"
            },
            "/product/:idOrEanOrName":{
                templateUrl: "templates/main/pages/product-info/template.html",
                controller: "productInfoController",
                title: "Product Info"
            },
            "/product":{
                templateUrl: "templates/main/pages/product-info/template.html",
                controller: "productInfoController",
                title: "Product Info"
            }
        }
    });

    return Router;
});