define([
    'BaseController'
], function(BaseController){
    var ExampleController = BaseController.extend({
        init: function(scope){
            this._super(scope)
        }
    });
    ExampleController.$inject = ["$scope"];

    return ExampleController;
});