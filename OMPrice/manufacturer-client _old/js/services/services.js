define([
    'Lodash',
    'services/main/service'
], function(_, MainService) {
  "use strict";

  var services = {
      "MainService": MainService
  };

  var initialize = function (angModule) {
    _.each(services,function(service,name){
      angModule.factory(name,service);
    })
  }

  return {
    initialize: initialize
  };
});
