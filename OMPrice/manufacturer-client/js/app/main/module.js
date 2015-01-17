define([
    'Angular',
    './header/HeaderController',
    './pages/product-info/module',
    './pages/home/module'
], function(angular, HeaderController){
    var module = angular.module('main', ['productInfo', 'home']);
    module.controller('headerController', HeaderController);

    return module;
});