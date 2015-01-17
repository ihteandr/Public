
define([
    'lodash',
    'Angular',
    'router/router',
    "config/config",
    './AppService',
    './AppController',
    './shared/module',
    './login/module',
    './main/module'
], function(_, angular, Router, Config, AppService, AppController){
    var App = {
        module: null,
        initialize: function(){
            this.module = angular.module("app", ["ngRoute", "shared", "login", "main"]);
            this.module.service("AppService", AppService);
            this.module.controller("appController", AppController);
            (new Router(this.module)).run();
            Config.setup(this.module);
            angular.bootstrap(document, ["app"]);
        }
    };
    return App;
});