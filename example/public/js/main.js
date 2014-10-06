"use strict";

require.config({
    paths: {
        jQuery: 'libs/jquery/jquery',//'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min'
        Underscore: 'libs/underscore/underscore',
        Bootstrap: 'libs/bootstrap/js/bootstrap.min',
        Modernizr: 'libs/modernizr-2.0.6.min',
        Angular: 'libs/angular/angularD',
        Moment: 'libs/moment/moment',
        templates: './../templates'
    },
    priority: [
        "jQuery",
        "Underscore",
        "Angular",
        "Modernizr",
        "Moment"
    ],
    shim:{
        "Bootstrap":{
            deps:["jQuery"]
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
