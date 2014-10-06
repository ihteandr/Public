define([
  // Standard Libs
    'Underscore',  // lib/underscore/underscore

  // Custom Services
    'services/data/service'
], function(_, ds) {
    "use strict";

    var services = {
        DataService: ds
    };

    var initialize = function (angModule) {
        _.each(services,function(service,name){
            angModule.factory(name,service);
        });
    };

    return {
        initialize: initialize
    };
});
