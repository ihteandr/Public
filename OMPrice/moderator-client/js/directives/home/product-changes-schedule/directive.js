define([
    'Lodash',
    'jquery',
    "text!templates/main/pages/home/product-changes-schedule/template.html"
], function(_, $, Template){
    return function(){
        return {
            restrict: "A",
            template: Template,
            scope: {

            },
            link: function($scope, element){
                $scope.$watch("requests", function(){
                    $(element[0]).find(".request").click(function(e){
                        var ean = e.currentTarget.getAttribute("data-ean");
                        App.navigate("/product/" + ean);
                    });
                });
            },
            controller: ["$scope", "ProductChangesScheduleService", function($scope, ProductChangesScheduleService){
                $scope.requests = [];
                $scope.offset = 0;
                ProductChangesScheduleService.getChangesSchedule($scope.offset).then(function(data){
                    _.each(data.requests, function(request){
                        request.date = new Date(request.date);
                    });
                    $scope.requests = data.requests;
                }, App.errorHandler);
                $scope.handleRequestClick = function(e){
                    var data = e.target.getAttribute("data-product");
                };
            }]
        };
    };
});