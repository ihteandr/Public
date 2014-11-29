define(["BaseController"], function(BaseController){
    var LoginController = BaseController.extend({
        _model: null,
        init: function($scope, LoginModel){
            this._model = LoginModel;
            this._super($scope);
        }
    });
    LoginController.$inject = ["$scope", "LoginModel"];
    return LoginController;
});