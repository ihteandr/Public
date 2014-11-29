define([
    'lodash'
], function(_){
    var services = {

    };

    var initialize = function(angModule){
        _.each(services, function(definition, name){
            angModule.service(name, definition);
        });
    };

    return {
        initialize: initialize
    };
});