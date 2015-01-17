define([
    'lodash',
    './example/directive'
], function(_, ExampleDirective){
    var directives = {
        "example": ExampleDirective
    };

    var initialize = function(angModule){
        _.each(directives, function(definition, name){
            angModule.directive(name, definition);
        });
    };

    return {
        initialize: initialize
    };
});