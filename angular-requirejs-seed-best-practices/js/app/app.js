
define([
    'lodash',
    'angular',
    './AppController',
    './shared/module',
    './login/module',
    './main/module'
], function(_, angular, AppController){
    var App = {
        module: null,
        initialize: function(){
            this.module = angular.module("app", ["shared", "login", "main"]);
            this.module.controller("appController", AppController);
        }
    };
    return App;
});