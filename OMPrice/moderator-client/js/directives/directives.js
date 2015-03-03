define([
    'Lodash',
    'directives/home/product-changes-schedule/directive',
    'directives/home/product-filters/directive',
    'directives/home/product/directive',
    'directives/product-info/product-eans/directive',
    'directives/product-info/product-image/directive',
    'directives/product-info/product-image/upload-images/directive',
    './shops/card/directive'
], function(_, ProductChangesScheduleDirective, ProductFiltersDirective, ProductDirective,
            ProductEansDirective, ProductImageDirective, UploadImagesDirective, ShopCardDirective){
  "use strict";

  var directives = {
      "productChangesSchedule": ProductChangesScheduleDirective,
      "productFilters": ProductFiltersDirective,
      "productItem": ProductDirective,
      "productEans": ProductEansDirective,
      "productImage": ProductImageDirective,
      "uploadImages": UploadImagesDirective,
      "shopCard": ShopCardDirective
  };

  var initialize = function (angModule) {
    _.each(directives,function(directive,name){
       angModule.directive(name,directive);
    });
  }

  return {
    initialize: initialize
  };
});
