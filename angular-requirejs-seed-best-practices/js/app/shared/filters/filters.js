define([
    'lodash',
    './example/filter'
], function(_, filter){
    var filters = {};

    var initialize = function(angModule){
        _.each(filters, function(definition, name){
            angModule.filter(name, definition);
        });
    };

    return {
        initialize: initialize
    };
});