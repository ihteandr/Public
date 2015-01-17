define([
  'jquery',
  'Lodash',
  'Angular',
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
        angular.module('myApp',['ngRoute']);
        var mainModule = angular.module('myApp');

        services.initialize(mainModule);
        directives.initialize(mainModule);
        filters.initialize(mainModule);
        controllers.initialize(mainModule);

        angular.bootstrap(document, ['myApp']);
    };

    return {
        initialize: initialize
    };
});
