define(["BaseController"], function(BaseController){
    var MainController = BaseController.extend({
        _mainModel: null,
        init: function(scope, mainModel){
            this._super(scope);
            this._mainModel = mainModel;
        }
    });
    MainController.$inject = ["$scope", "MainModel"];
    return MainController;
});