define([
    'lodash'
], function(_){
    var directives = {

    };

    var initialize = function(module){
        _.each(directives, function(definition, name){
            module.directive(name, definition);
        });
    };

    return {
        initialize: initialize
    };
});