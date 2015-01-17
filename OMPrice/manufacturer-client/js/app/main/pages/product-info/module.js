define([
    'Angular',
    './ProductInfoService',
    './ProductInfoModel',
    './ProductInfoController',
    './directives/directives'
], function(angular, ProductInfoService, ProductInfoModel, ProductInfoController, directives){
    var module = angular.module('productInfo', []);
    module.service('ProductInfoService', ProductInfoService);
    module.provider('ProductInfoModel', ProductInfoModel);
    module.controller('productInfoController', ProductInfoController);
    directives.initialize(module);

    return module;
});