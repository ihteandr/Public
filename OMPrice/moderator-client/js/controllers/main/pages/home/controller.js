define([
    "jquery",
    "Lodash"
], function($, _){
    return ["$scope", "HomeService", "SpinService", function($scope, HomeService, SpinService){
        $scope.productList = [];
        $scope.pages = [];
        $scope.currentPage = 1;
        var queryData = {
            offset: 0,
            limit: 24
        };
        var fetchProducts = function(){
            $scope.productList = [];
            SpinService.startSpin($(".home-content-container")[0]);
            HomeService.getProductList(queryData).then(function(data){
                $scope.productList = data.products;
                $scope.total = data.total;
                $scope.regeneratePages();
                SpinService.stopSpin();
            }, App.errorHandler);
        };
        var checkProperty = function(data,name){
            if(data[name] != undefined){
                queryData[name] = data[name];
            } else {
                delete queryData[name];
            }
        };

        var configurePage = function(){
            if($scope.currentPage == 1){
                fetchProducts();
            } else {
                $scope.currentPage = 1;
            }
        };

        $scope.$watch("currentPage", function(newValue, oldValue){
            if(newValue != oldValue){
                queryData.offset = ($scope.currentPage - 1) * 25;
                fetchProducts();
            }
        });

        $scope.$on("marketSelected", function(event, data){
            checkProperty(data, "market");
            configurePage();
        });

        $scope.$on("sectionSelected", function(event, data){
            checkProperty(data, "section");
            configurePage();
        });

        $scope.$on("categorySelected", function(event, data){
            checkProperty(data, "category");
            configurePage();
        });

        $scope.$on("familySelected", function(event, data){
            checkProperty(data, "family");
            configurePage();
        });

        $scope.$on("countrySelected", function(event, data){
            checkProperty(data, "country");
            configurePage();
        });

        $scope.$on("brandSelected", function(event, data){
            checkProperty(data, "brand");
            configurePage();
        });

        $scope.regeneratePages = function(option){
            var pages = [];
            var lastPage = Math.ceil($scope.total/25);
            var firstIndex = $scope.currentPage - 5 > 1 ? $scope.currentPage - 5 : 1;
            if(firstIndex != 1){
                pages.push(1);
            }

            if($scope.currentPage > 6){
                pages.push("..");
            }

            for(var i = firstIndex; i < lastPage && i - firstIndex <= 10; i ++){
                pages.push(i);
            }
            var numbers = _.filter(pages, function(page){return !isNaN(page);});
            numbers.push(1);
            if(Math.max.apply(Math, numbers) < lastPage){
                pages.push("...");
            }
            pages.push(lastPage);
            $scope.pages = pages;
            if($scope.currentPage == 1){
                $("li[name=prevPageLink]").addClass("disabled");
            }
            if($scope.currentPage == lastPage){
                $("li[name=nextPageLink]").addClass("disabled");
            }
        };

        $scope.prevPage = function(option){
            if(option){
                $scope.currentPage -= 5;
            } else if($scope.currentPage > 1){
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function(option){
            if(option){
                $scope.currentPage +=5;
            } else if($scope.currentPage < $scope.total/25){
                $scope.currentPage++;
            }
        };
        $scope.goPage = function(e){
            var page = $(e.target).attr("data-page");
            $scope.currentPage = parseInt(page);
        };
    }];
});