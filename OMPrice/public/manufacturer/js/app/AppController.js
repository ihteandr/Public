define(["BaseController"],function(e){var t=e.extend({_service:null,init:function(e,t,i){this._super(e),this._service=t,this.$route=i,this.checkAuthorization()},checkAuthorization:function(){var e=this;this._service.checkAuthorization().then(function(t){t.data?(e.$scope.template.url="templates/main/template.html",e.$route.reload()):e.$scope.template.url="templates/login/template.html"},function(){e.$scope.template.url="templates/login/template.html"})},defineScope:function(){this._super(),this.$scope.template={}},enterMain:function(){this.$scope.template.url="templates/main/template.html"},defineListeners:function(){this._super(),this.$scope.$on("authorized",this.enterMain.bind(this))}});return t.$inject=["$scope","AppService","$route"],t});