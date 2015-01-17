define([
    'Angular',
    './LoginController',
    './LoginService',
    './LoginModel',
    './directives/directives'
], function(angular, LoginController, LoginService, LoginModel, directives){
    var module = angular.module("login",[]);

    module.service("LoginService", LoginService);
    module.provider("LoginModel", LoginModel);
    module.controller("loginController", LoginController);
    directives.initialize();

    return module;
});