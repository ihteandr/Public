define([
    'lodash',
    './modal/create/base/PopupCreateBaseController'
], function(_, PopupCreateBaseController){
    var controllers = {
        "popupCreateBaseController": PopupCreateBaseController
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