define([
    'Lodash',
    'services/main/service',
    'services/home/service',
    'services/home/product-filters/service',
    'services/home/product-changes-schedule/service',
    'services/product-info/service',
    'services/shared/modal/service',
    'services/shared/spin/service'
], function(_, MainService, HomeService, ProductFiltersService, ProductChangesScheduleService, ProductInfoService,
            ModalService, SpinService) {
  "use strict";

  var services = {
      "MainService": MainService,
      "HomeService": HomeService,
      "ProductFiltersService": ProductFiltersService,
      "ProductChangesScheduleService": ProductChangesScheduleService,
      "ProductInfoService": ProductInfoService,
      "ModalService": ModalService,
      "SpinService": SpinService
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
