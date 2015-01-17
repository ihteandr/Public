"use strict";

require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        Lodash: 'libs/lodash/lodash.min',
        Bootstrap: 'libs/bootstrap/js/bootstrap.min',
        BootstrapGrowl: 'libs/bootstrap/js/bootstrap-growl.min',
        Angular: 'libs/angular/angular-main',
        templates: './../templates'
    },
    priority: [
        "jquery",
        "Lodash",
        "Angular",
        "Bootstrap",
        "BootstrapGrowl"
    ],
    shim:{
        "Bootstrap":{
            deps:['jquery']
        },
        "BootstrapGrowl":{
            deps:['jquery']
        }
    },
    urlArgs: 'v=1.0',
    waitSeconds: 1000
});

require([
  // Standard Libs
  'require'
], function (require) {
  require(['app'], function (App) {
    App.initialize();
  });
});
