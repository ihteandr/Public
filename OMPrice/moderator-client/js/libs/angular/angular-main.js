define([
    'libs/angular/angular',
    'libs/angular/angular-route'
], function () {

    if (typeof _ != 'undefined') {
        _.noConflict();
    }

    if(typeof $ != 'undefined') {
        $.noConflict();
    }
  return angular;
});
