define([
    'lodash',
    './example/controller'
], function(_, exampleController){
    var controllers = {
        "exampleController": exampleController
    };
    var initialize = function(angModule){
        _.each(controllers, function(definition, name){
            angModule.controller(name, definition);
        });
    };
    return {
        initialize: initialize
    };
});