define([
    'lodash'
], function(_){
    var models = {};

    var initialize = function(angModule){
        _.each(models, function(definition, name){
            angModule.provider(name, definition);
        });
    };

    return {
        initialize: initialize
    };
});