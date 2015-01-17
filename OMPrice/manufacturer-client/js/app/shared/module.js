define([
    'lodash',
    'Angular',
    './controllers/controllers',
    './directives/directives',
    './filters/filters',
    './models/models',
    './services/services'
], function(_, angular, controllers, directives, filters, models, services){
    var module = angular.module("shared", []);
    services.initialize(module);
    models.initialize(module);
    filters.initialize(module);
    directives.initialize(module);
    controllers.initialize(module);

    return module;
});