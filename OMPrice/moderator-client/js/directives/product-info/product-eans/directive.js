define([
    'jquery',
    'Lodash',
    "text!templates/main/pages/product-info/product-eans/template.html",
    "text!templates/popups/create/base/template.html",
    'Bootstrap'
], function($, _, Template, EanCreateTemplate){
    return function(){
        return {
            restrict: "EA",
            replace: true,
            template:Template,
            scope:{
                "ean":"=",
                "tmpEan": "=",
                "currentEan": "="
            },
            controller: ["$scope", "ModalService", function($scope, ModalService){
                $scope.eans = $scope.eans || [];
                $scope.tmpEans = $scope.tmpEans || [];
                function updateCurrentEan(){
                    $scope.currentEan = _.union($scope.eans, $scope.tmpEans).join(",");
                }
                $scope.$watch("ean", function(newValue, oldValue){
                    if($scope.ean){
                        $scope.eans = $scope.ean.split(",");
                        updateCurrentEan();
                    }
                });
                $scope.$watch("tmpEan", function(newValue, oldValue){
                    if($scope.tmpEan){
                        $scope.tmpEans = _.difference($scope.tmpEan.split(","), $scope.eans);
                        updateCurrentEan();
                    }
                });
                $scope.addEAN = function(){
                    ModalService.showModal({
                        template: EanCreateTemplate,
                        controller: "baseCreateController",
                        inputs: {
                            title: "Create EAN",
                            validator: function(value){
                                return value.length == 13;
                            },
                            errorMsg: "EAN must have 13 length"
                        }
                    }).then(function(modal){
                        modal.element.modal();
                        console.log("element ", modal.element);
                        setTimeout(function(){$(modal.element[0]).find("input").focus();}, 200);
                        modal.close.then(function(result){
                            if(result.answer == 1){
                                $scope.eans.push(result.name);
                                $scope.ean = $scope.eans.join(",");
                            }
                        });
                    });
                };
                $scope.removeEan = function(e){
                    var r_ean = $(e.target).attr("data-ean");
                    $scope.eans = _.filter($scope.eans, function(ean){
                        return ean != r_ean;
                    });
                    $scope.ean = $scope.eans.join(",");
                };
            }]
        };
    };
});