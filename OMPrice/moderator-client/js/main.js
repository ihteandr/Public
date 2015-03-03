"use strict";

require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        moment: 'libs/moment/lib',
        spin: 'libs/spin/lib',
        jcarousel: 'libs/jquery/jcarousel/lib',
        Lodash: 'libs/lodash/lodash.min',
        Bootstrap: 'libs/bootstrap/js/bootstrap',
        BootstrapGrowl: 'libs/bootstrap/js/bootstrap-growl.min',
        Angular: 'libs/angular/angular-main',
        templates: './../templates'
    },
    priority: [
        "jquery",
        "moment",
        "Lodash",
        "Angular"
    ],
    shim:{
        "Bootstrap":{
            deps:['jquery']
        },
        "BootstrapGrowl":{
            deps:['jquery']
        },
        "jcarousel":{
            deps: ['jquery']
        }
    },
    urlArgs: 'v=1.0'
});

require([
  // Standard Libs
  'require'
], function (require) {
  require(['app'], function (App) {
    App.initialize();
  });
});
