define([
    'lodash',
    './modal/ModalService',
    './spin/SpinService'
], function(_, ModalService, SpinService){
    var services = {
        "ModalService": ModalService,
        "SpinService": SpinService
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