define([
    'jquery',
    'Lodash',
    'moment'
], function($, _, moment){
    return ["$scope", "$routeParams", "ProductInfoService", "SpinService",
        function($scope, $routeParams, ProductInfoService, SpinService){
            var isRequest = false;
            $scope.currentProduct = {
                isNotInitialized: true
            };
            if($routeParams.idOrEanOrName){
                var idOrEanOrName = $routeParams.idOrEanOrName;
                var query = {};
                if(/^[\d,]+$/.test(idOrEanOrName)){
                    query.ean = idOrEanOrName;
                } else if(/^([a-z]|[0-9])+$/.test(idOrEanOrName)){
                    query._id = idOrEanOrName;
                } else {
                    query.name = idOrEanOrName;
                }

                setTimeout(function(){SpinService.startSpin($("form.not-initialized")[0]);},200);
                ProductInfoService.getProduct(query).then(function(products){
                    var ean;
                    if(products){
                        if(typeof products.length != "undefined"){
                            if(products.length > 1){
                                $scope.products = products;
                            } else {
                                $scope.product = products[0];
                            }
                        } else {
                            $scope.product = products;
                        }
                    }

                    if($scope.product){
                        ean = $scope.product.ean;
                        _.each($scope.product.prices, function(price){
                            price.date = moment(price.date, "DD/MM/YY");
                        });
                    } else if(query.ean) {
                        $scope.product = {
                            details: {
                                nutritional: {}
                            }
                        };
                        ean = query.ean;
                    } else {
                        $scope.notFound = true;
                    }
                    if(ean){
                        ProductInfoService.getTmpProduct(ean).then(function(result){
                            if(result && result.product){
                                isRequest = true;
                                $scope.tmpProduct = result.product;
                                $scope.currentProduct = $scope.tmpProduct
                            } else {
                                $scope.tmpProduct = {};
                                $scope.currentProduct = $scope.product;
                            }
                            if(!$scope.currentProduct){
                                $scope.notFound = true;
                            }else {
                                $scope.currentProduct.images = $scope.product.images || [];
                            }
                            ProductInfoService.getMarkets().then(function(results){
                                SpinService.stopSpin();
                                $scope.markets = results;
                            }, App.errorHandler);
                        }, App.errorHandler);
                    }
                },function(data){
                    App.errorHandler(data);
                    $scope.notFound = true;
                });
            } else {
                $scope.currentProduct = {
                    ean: null,
                    details: {
                        nutritional: {}
                    }
                };
                $scope.isNew = true;
                $scope.product = {
                    ean: null,
                    details: {
                        nutritional: {}
                    }
                };
                $scope.tmpProduct = {};
                ProductInfoService.getMarkets().then(function(results){
                    $scope.markets = results;
                }, App.errorHandler);
            }

            $scope.newImages = [];
            function fetchSections(){
                ProductInfoService.getSections($scope.currentProduct.market).then(function(results){
                    $scope.sections = results;
                    var section = _.find($scope.sections, function(section){
                        return section._id == $scope.currentProduct.section;
                    });
                    if(!section){
                        $scope.currentProduct.section = "";
                        $scope.currentProduct.category = "";
                        $scope.currentProduct.family = "";
                    }
                }, App.errorHandler);
            }
            function fetchCategories(){
                if($scope.currentProduct.section == ""){
                    $scope.categories = [];
                    $scope.currentProduct.family = "";
                    return;
                }
                ProductInfoService.getCategories($scope.currentProduct.section).then(function(results){
                    $scope.categories = results;
                    var category = _.find($scope.categories, function(category){
                        return category._id == $scope.currentProduct.category;
                    });
                    if(!category){
                        $scope.currentProduct.category = "";
                        $scope.currentProduct.family = "";
                    }
                }, App.errorHandler);
            }
            function fetchFamilies(){
                if($scope.currentProduct.category == ""){
                    $scope.families = [];
                    return;
                }
                ProductInfoService.getFamilies($scope.currentProduct.category).then(function(results){
                    $scope.families = results;
                }, App.errorHandler);
            }
            $scope.$watch("currentProduct.market", function(newValue, oldValue){
                if(newValue !== oldValue){
                    fetchSections();
                    fetchCategories();
                    fetchFamilies();
                }
            });

            $scope.$watch("currentProduct.section", function(newValue, oldValue){
                if(newValue !== oldValue){
                    fetchCategories();
                    fetchFamilies();
                }
            });

            $scope.$watch("currentProduct.category", function(newValue, oldValue){
                if(newValue !== oldValue){
                    fetchFamilies();
                }
            });

            ProductInfoService.getCountries().then(function(results){
                $scope.countries = results;
            }, App.errorHandler);

            ProductInfoService.getBrands().then(function(results){
                $scope.brands = results;
            }, App.errorHandler);

            ProductInfoService.getBulkUnits().then(function(results){
                $scope.bulkUnits = results;
            }, App.errorHandler);

            function validate(){
                var validateFields = ["family", "section", "category", "market"],
                    checker = true;
                if(!$scope.product.ean && !$scope.tmpProduct.ean){
                    $("#ean").addClass("error");
                    checker = false;
                } else {
                    $("#ean").removeClass("error");
                }
                for(var i = 0, len = validateFields.length; i < len; i ++){
                    if(!$scope.currentProduct[validateFields[i]]){
                        $("#" + validateFields[i]).addClass("error");
                        checker = false;
                    } else {
                        $("#" + validateFields[i]).removeClass("error");
                    }
                }
                return checker;
            }

            $scope.submit = function(){
                if(validate()){
                    console.log("new Images ", $scope.newImages);
                    ProductInfoService.saveProduct({
                        product: $scope.currentProduct,
                        newImages: $scope.newImages
                    }, isRequest).then(function(product){
                        $scope.product = $scope.currentProduct;
                        $scope.tmpProduct = {ean:""};
                        $scope.product.images = product.images;
                        $scope.newImages = [];
                        $scope.$broadcast("resetUpl0oader");
                        $.growl({
                            message: "Изменения Сохранены"
                        },{
                            type: 'success'
                        });
                        isRequest = false;
                    }, App.errorHandler);
                }
            };
            $scope.back = function(){
                App.navigate("/home");
            };
            $scope.checkName = function(){
                if($scope.tmpProduct.name &&
                    ($scope.product.name != $scope.tmpProduct.name)){
                    return true;
                }
                return false;
            };

            $scope.checkMarket = function(){
                if($scope.tmpProduct.market &&
                    ($scope.product.market != $scope.tmpProduct.market)){
                    return true;
                }
                return false;
            };

            $scope.checkSection = function(){
                if($scope.tmpProduct.section &&
                    ($scope.product.section != $scope.tmpProduct.section)){
                    return true;
                }
                return false;
            };

            $scope.checkCategory = function(){
                if($scope.tmpProduct.category &&
                    ($scope.product.category != $scope.tmpProduct.category)){
                    return true;
                }
                return false;
            };

            $scope.checkFamily = function(){
                if($scope.tmpProduct.family &&
                    ($scope.product.family != $scope.tmpProduct.family)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsBulk = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.bulk != $scope.tmpProduct.details.bulk)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsBulkUnit = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.bulkUnit != $scope.tmpProduct.details.bulkUnit)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsBrandName = function(){
                if($scope.tmpProduct.details){
                    if(!$scope.product.details.brand && !$scope.tmpProduct.details.brand){
                        return false;
                    }
                    if(!$scope.product.details.brand && $scope.tmpProduct.details.brand){
                        return true;
                    }
                    if($scope.product.details.brand.name != $scope.tmpProduct.details.brand.name){
                        return true;
                    }

                }
                return false;
            };

            $scope.checkDetailsManufacturer = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.manufacturer != $scope.tmpProduct.details.manufacturer)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsCountry = function(){
                if($scope.tmpProduct.details){
                    if(!$scope.product.details.country && !$scope.tmpProduct.details.country){
                        return false;
                    }
                    if(!$scope.product.details.country && $scope.tmpProduct.details.country){
                        return true;
                    }
                    if($scope.product.details.country._id != $scope.tmpProduct.details.country._id){
                        return true;
                    }
                }
                return false;
            };

            $scope.checkDetailsAddress = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.address != $scope.tmpProduct.details.address)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsWebsite = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.website != $scope.tmpProduct.details.website)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsPhone = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.phone != $scope.tmpProduct.details.phone)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsEmail = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.email != $scope.tmpProduct.details.email)){
                    return true;
                }
                return false;
            };

            $scope.checkDetailsSummary = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.summary != $scope.tmpProduct.details.summary)){
                    return true;
                }
                return false;
            };
            $scope.checkDetailsConsist = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.consist != $scope.tmpProduct.details.consist)){
                    return true;
                }
                return false;
            };
            $scope.checkDetailsNutritionalFat = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.nutritional.fat != $scope.tmpProduct.details.nutritional.fat)){
                    return true;
                }
                return false;
            };
            $scope.checkDetailsNutritionalProtein = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.nutritional.protein != $scope.tmpProduct.details.nutritional.protein)){
                    return true;
                }
                return false;
            };
            $scope.checkDetailsNutritionalCarbohydrates = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.nutritional.carbohydrates != $scope.tmpProduct.details.nutritional.carbohydrates)){
                    return true;
                }
                return false;
            };
            $scope.checkDetailsNutritionalCaloric = function(){
                if($scope.tmpProduct.details &&
                    ($scope.product.details.nutritional.caloric != $scope.tmpProduct.details.nutritional.caloric)){
                    return true;
                }
                return false;
            };
            $scope.checkStatus = function(){
                if($scope.tmpProduct.status &&
                    ($scope.product.status != $scope.tmpProduct.status)){
                    return true;
                }
                return false;
            };
        }];
});