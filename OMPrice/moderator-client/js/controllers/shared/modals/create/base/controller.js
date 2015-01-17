define([
    'jquery'
], function($){
    return ["$scope", "title", "validator", "errorMsg", "close", function($scope, title, validator, errorMsg, close){
        validator || (validator = function(){return true});
        $scope.value = "";
        $scope.title = title;
        $scope.error = false;
        $scope.errorMsg = errorMsg;
        $scope.handleKeyUp = function(e){
            if(e.keyCode == 13){
                $scope.save();
            }
        };
        $scope.save = function(){
            if($scope.value && validator($scope.value)){
                $scope.close({
                    answer: 1,
                    name: $scope.value
                });
            } else {
                $scope.error = true;
                $("#base-create-input").parent().addClass("has-error");
            }
        };
        $scope.close = function(data){
            close(data || {
                answer: -1
            }, 500);
            setTimeout(function(){
                $(".modal-backdrop").remove();
                $("body").removeClass("modal-open");
            }, 600);
        }
    }];
});