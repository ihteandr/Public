define([
    "jquery"
],function($){
    return ["$scope", "$route", "MainService", function($scope, $route, MainService){
        $scope.template = {};
        MainService.checkAuthorization().then(function(response){
            if(response.data){
                $scope.template.url = "templates/main/page.html";
            } else {
                $scope.template.url = "templates/main/login.html";
            }
        }, function(response){
            $("body").growl({
                message: "Error on the Server."
            }, {
                type: "danger"
            });
            $scope.template.url = "templates/main/login.html";
        });
        var showError = function(){
            $("div[name=dataUserName]").addClass("has-error");
            $("div[name=dataPassword]").addClass("has-error");
        };
        var validate = function(){
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
        };
        $scope.handleKeyUp = function(e){
            if(e.keyCode == 13){
                $scope.submit();
            }
        };
        $scope.submit = function(e){
            var data = validate();
            if(data){
                MainService.tryLogin(data).then(function(response){
                    if(response.status == "success"){
                        $scope.authorized = App.authorized = true;
                        App.user = response.data;
                        $scope.template.url = "templates/main/page.html";
                        $route.reload();
                    } else {
                        $scope.error = true;
                        showError();
                    }
                }, function(){
                    showError();
                    $scope.error = true;
                });
            }
        };
    }];
});