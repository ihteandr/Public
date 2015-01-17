define([
    'jquery',
    "text!templates/main/pages/home/product-filters/template.html"
], function($, Template){
    return function(){
        return {
            require: '^?ngModel',
            restrict: "A",
            template: Template,
            scope: {

            },
            controller:["$scope", "$location", "ProductFiltersService", function($scope, $location, ProductFiltersService){
                $scope.markets = [];
                $scope.sections = [];
                $scope.categories = [];
                $scope.families = [];
                $scope.countries = [];
                $scope.brands = [];
                $scope.selectedMarket = "";
                $scope.selectedSection = "";
                $scope.selectedCategory = "";
                $scope.selectedFamily = "";
                $scope.selectedCountry = "";
                $scope.selectedBrand = "";
                $scope.createProduct = function(){
                    $location.path("/product");
                };


                ProductFiltersService.getMarkets().then(function(data){
                    $scope.markets = data;
                }, App.errorHandler);

                ProductFiltersService.getCountries().then(function(data){
                    $scope.countries = data;
                }, App.errorHandler);

                ProductFiltersService.getBrands().then(function(data){
                    $scope.brnads = data;
                }, App.errorHandler);

                $scope.$watch("selectedMarket", function(newValue){
                    if($scope.selectedMarket){
                        ProductFiltersService.getSections($scope.selectedMarket).then(function(data){
                            $scope.sections = data;
                        }, App.errorHandler);
                        $scope.$emit("marketSelected", {market: $scope.selectedMarket});
                    } else {
                        $scope.sections = [];
                    }
                    $scope.categories = [];
                    $scope.families = [];
                });

                $scope.$watch("selectedSection", function(newValue) {
                    if($scope.selectedSection){
                        ProductFiltersService.getCategories($scope.selectedSection).then(function(data){
                            $scope.categories = data;
                        }, App.errorHandler);
                        $scope.$emit("sectionSelected", {section: $scope.selectedSection});
                    } else {
                        $scope.categories = [];
                    }
                    $scope.families = [];
                });

                $scope.$watch("selectedCategory", function(newValue){
                    if($scope.selectedCategory){
                        ProductFiltersService.getFamilies($scope.selectedCategory).then(function(data){
                            $scope.families = data;
                        }, App.errorHandler);
                        $scope.$emit("categorySelected", {category: $scope.selectedCategory});
                    } else {
                        $scope.families = [];
                    }
                });

                $scope.$watch("selectedFamily", function(newValue, oldValue){
                    if(oldValue != newValue){
                        $scope.$emit("familySelected", {family: $scope.selectedFamily});
                    }
                });

                $scope.$watch("selectedCountry", function(newValue, oldValue){
                    if(oldValue != newValue){
                        $scope.$emit("countrySelected", {country: $scope.selectedCountry});
                    }
                });

                $scope.$watch("selectedBrand", function(newValue, oldValue){
                    if(oldValue != newValue){
                        $scope.$emit("brandSelected", {country: $scope.selectedBrand});
                    }
                });
            }],
            link: function($scope){

            }
        };
    };
});