define([
    'jquery',
    "text!templates/main/pages/product-info/product-image/template.html",
    'jcarousel'
], function($, Template){
    return function(){
        return {
            restrict: "EA",
            template: Template,
            scope: {
                images: "=",
                newImages: "="
            },
            link: function($scope, element, attrs){
                $scope.$watch("images", function(){
                    console.log("images", $scope.images);
                    setTimeout(function() {
                        $(element[0]).find(".jcarousel").jcarousel();
                        $(element[0]).find('.jcarousel-pagination')
                            .on('jcarouselpagination:active', 'a', function () {
                                $(this).addClass('active');
                            })
                            .on('jcarouselpagination:inactive', 'a', function () {
                                $(this).removeClass('active');
                            })
                            .jcarouselPagination({
                                item: function (page) {
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