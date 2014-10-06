define([
  // Standard Libs
    'jQuery',     // lib/jquery/jquery
    'Underscore', // lib/underscore/underscore
    'Angular',    // lib/angular/angular

    // Application Files
    'services/services',
    'directives/directives',
    'filters/filters',
    'controllers/controllers'
], function ($, _, angular, services, directives, filters, controllers) {
    "use strict";

    var initialize = function () {

        window.App = {
            navigate: function(hash){
                window.location.hash = hash;
            }
        };
        var mainModule = angular.module('myApp', ['ngRoute']);
        services.initialize(mainModule);
        directives.initialize(mainModule);
        filters.initialize(mainModule);
        controllers.initialize(mainModule);
        google.setOnLoadCallback(function() {
            angular.bootstrap(document.body, ['myApp']);
        });
        angular.bootstrap(document, ['myApp']);
    };

    return {
        initialize: initialize
    };
});
