define(['BaseController'], function(BaseController){
    var AppController = BaseController.extend({
        init: function(scope){
            this._super(scope);
        }
    });

    AppController.$inject = ["$scope"];
    return AppController;
});