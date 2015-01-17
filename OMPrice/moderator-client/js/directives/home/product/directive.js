define([
    'jquery',
    "text!templates/main/pages/home/product/template.html",
    'jcarousel'
], function($, Template){
    return function(){
        return {
            restrict: "A",
            template: Template,
            scope:{
                "product": "="
            },
            link: function($scope, element){
                $scope.$watch("product.images", function(){
                    setTimeout(function(){
                        $(element[0]).find(".jcarousel").jcarousel();
                        $(element[0]).find(".jcarousel-pagination").jcarouselPagination({
                            item: function(page) {
                                return '<a class="link">' + page + '</a>';
                            }
                        });
                    }, 1000);
                });
            },
            controller: ["$scope", function($scope){
            }]
        };
    };
});