define([
    'jquery'
],function($){
    return ["$scope", "HeaderService", function($scope, Service){
        $scope.search = function(e){
            App.navigate("/product/"+$(".main-header .search").val());
        };

        $scope.keyUpHandler = function(e){
            if(e.keyCode == 13){
                $scope.search();
            }
        };
        function chooseFile(callback){
            var uploader = $("#uploader");
            uploader.one("change",callback);
            uploader.click();
        }

        function showAlert(response){
            $("#uploader").val("");
            console.log("response ", response);
            if(response.status == "fail"){
                alert(response.error.message);
            } else {
                alert("Файл отпрален через несколько часов данные будут занесенны в базу данных.\n Спасибо");
            }
        }

        $scope.uploadProducts = function(e){
            chooseFile(function(event){
                Service.uploadProducts(event.target.files[0]).then(showAlert);
            });
        };

        $scope.uploadPrices = function(e){
            chooseFile(function(event){
                Service.uploadPrices(event.target.files[0]).then(showAlert);
            });
        };

        $scope.uploadShops = function(e){
            chooseFile(function(event){
                Service.uploadShops(event.target.files[0]).then(showAlert);
            });
        };

        $scope.logout = function(){
            Service.logout();
        };
    }];
});