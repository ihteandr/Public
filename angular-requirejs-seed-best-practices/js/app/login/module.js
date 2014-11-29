define([
    'angular',
    './LoginController',
    './LoginService',
    './LoginModel',
    './directives/directives'
], function(angular, LoginController, LoginService, LoginModel, directives){
    var module = angular.module("login",[]);

    module.service("LoginService", LoginService);
    module.provider("LoginModel", LoginModel);
    module.controller("LoginController", LoginController);
    directives.initialize();

    return module;
});