define([
    'lodash',
    'angular',
    'js/globals/controllers/controllers',
    'js/globals/directives/directives',
    'js/globals/filters/filters',
    'js/globals/models/models',
    'js/globals/services/services'
], function(_, angular, controllers, directives, filters, models, services){
    var module = angular.module("shared", []);
    services.initialize(module);
    models.initialize(module);
    filters.initialize(module);
    directives.initialize(module);
    controllers.initialize(module);

    return module;
});