define([
    'order!libs/angular/angular',
    'order!libs/angular/angular-route'
], function () {

  if (typeof _ != 'undefined') {
    _.noConflict();
  }

  if(typeof $ != 'undefined') {
    //$.noConflict();
  }
  return angular;
});
