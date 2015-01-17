define([
    'jquery',
    'Lodash',
    "text!templates/main/pages/product-info/product-image/upload-images/template.html"
], function($, _, Template){
    return function(){
        return {
            require: ["^?productImage"],
            restrict: "EA",
            template: Template,
            scope: {
                "images": "=newImages"
            },
            link: function($scope, element, attrs, Ctrl){
                var index = 1;
                var addChangeListener = function(el){
                    el.on("change", function(e){
                        var index = $(e.target).attr("data-index");
                        $scope.images[index] = {
                            file: e.target.files[0]
                        };
                    });
                };
                var addNewElement = function(){
                    var el = $('\
                                <li>\
                                    <span class="image-remove" data-index="' + (++index) + '">×</span>\
                                    <input type="file" name="upload-image" data-index="' + index + '" accept="image/*"/>\
                                </li>\
                                ');
                    addChangeListener(el.find("input"))
                    $(element[0]).find("ul").append(el);
                    $(element[0]).find(".image-remove").off();
                    $(element[0]).find(".image-remove").on("click", function(e){
                        var index = $(e.target).attr("data-index");
                        delete $scope.images[index];
                        $(element[0]).find("input[data-index=" + index +"]").parent().remove();
                    });
                    $(element[0]).find("input[data-index=" + index +"]").click();
                };
                addChangeListener($(element[0]).find("input[name=upload-image]"));
                $(element[0]).find("a[name=add-image]").on("click", function(){
                    addNewElement();
                });
                $scope.$on("resetUploader", function(){
                    $(element[0]).find("ul").html("");
                    index = 0;
                    $scope.images = [];
                    addNewElement();
                });
            },
            controller: ["$scope", function($scope){

            }]
        };
    };
});