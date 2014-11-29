define([
    'angular',
    './MainService',
    './MainModel',
    './MainController',
    './directives/directives'
], function(angular, MainService, MainModel, MainController, directives){
    var module = angular.module("main",[]);
    module.service("MainService", MainService);
    module.provider("MainModel", MainModel);
    module.controller("MainController", MainController);
    directives.initialize(module);

    return module;
});