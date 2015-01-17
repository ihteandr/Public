define(['jquery', "BaseController"], function($, BaseController){
    var LoginController = BaseController.extend({
        _model: null,
        init: function($scope, LoginModel){
            this._super($scope);
            this._model = LoginModel;
        },
        _showError: function(){
            $("div[name=dataUserName]").addClass("has-error");
            $("div[name=dataPassword]").addClass("has-error");
        },
        _validate: function(){
            var checker = true,
                user = $("#InputUser").val(),
                password = $("#InputPassword").val();
            if(user.trim() === ""){
                checker = false;
                $("div[name=dataUserName]").addClass("has-error");
            }else{
                $("div[name=dataUserName]").removeClass("has-error");
            }
            if(password.trim() === ""){
                checker = false;
                $("div[name=dataPassword]").addClass("has-error");
            }else{
                $("div[name=dataPassword]").removeClass("has-error");
            }
            if(checker){
                return {
                    username: user,
                    password: password
                }
            } else {
                return false;
            }
        },
        handleKeyUp: function(e){
            if(e.keyCode == 13){
                this.submit();
            }
        },
        submit: function(e){
            var self = this;
            var data = this._validate();
            if(data){
                this._model.tryLogin(data).then(function(response){
                    if(response.status == "success"){
                        self.$scope.$emit("authorized", {user: response.data});
                    } else {
                        self.$scope.error = true;
                        self._showError();
                    }
                }, function(){
                    self._showError();
                    self.$scope.error = true;
                });
            }
        },
        defineScope: function(){
            this.$scope.handleKeyUp = this.handleKeyUp.bind(this);
            this.$scope.submit = this.submit.bind(this);
        }
    });
    LoginController.$inject = ["$scope", "LoginModel"];

    return LoginController;
});