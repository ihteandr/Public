define(['BaseController'], function(BaseController){
    var AppController = BaseController.extend({
        _service: null,
        init: function(scope, AppService, route){
            this._super(scope);
            this._service = AppService;
            this.$route = route;
            this.checkAuthorization();
        },
        checkAuthorization: function(){
            var self = this;
            this._service.checkAuthorization().then(function(response){
                if(response.data){
                    self.$scope.template.url = "templates/main/template.html";
                    self.$route.reload();
                } else {
                    self.$scope.template.url = "templates/login/template.html";
                }
            }, function(response){
                self.$scope.template.url = "templates/login/template.html";
            });
        },
        defineScope: function(){
            this._super();
            this.$scope.template = {};
        },
        enterMain: function(){
            this.$scope.template.url = "templates/main/template.html";
        },
        defineListeners: function(){
            this._super();
            this.$scope.$on("authorized", this.enterMain.bind(this));
        }
    });

    AppController.$inject = ["$scope", "AppService", "$route"];
    return AppController;
});