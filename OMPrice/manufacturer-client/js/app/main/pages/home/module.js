define([
    'Angular',
    './HomeController'
], function(angular, HomeController){
    var module = angular.module('home',[]);
    module.controller('homeController', HomeController);
    return module;
});