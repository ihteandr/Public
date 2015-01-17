define([
    'jquery'
],function($){
    return ["$scope", function($scope){
        $scope.search = function(e){
            App.navigate("/product/"+$(".main-header .search").val());
        };

        $scope.keyUpHandler = function(e){
            if(e.keyCode == 13){
                $scope.search();
            }
        };
    }];
});