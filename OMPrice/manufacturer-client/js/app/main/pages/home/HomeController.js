define(["BaseController"], function(BaseController){
    var HomeController = BaseController.extend({
        init: function($scope){
            this._super($scope);
        }
    });
    HomeController.$inject = ["$scope"];

    return HomeController;
});