define([
  // Standard Libs
  'Underscore'  // lib/underscore/underscore
  // Application Filters

], function (_){
  "use strict";

  var filters = {};

  var initialize = function (angModule) {
    _.each(filters,function(filter,name){
      angModule.filter(name,filter);
    })
  }

  return {
    initialize: initialize
  };
});
