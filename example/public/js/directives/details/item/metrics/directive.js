define([
    "text!templates/details/item/metrics/template.html"
],function(Template){
    return function(){
        return {
            restrict: "A",
            template: Template,
            scope:{
                "data": "=data"
            },
            link: function(scope){
                if(scope.data.test){
                    if(scope.data.test > 50){
                        scope.testImage = "green_arrow";
                    }else{
                        scope.testImage = "red_arrow";
                    }
                } else{
                    scope.testImage = "blue_arrow";
                }
                if(scope.data.maintainability){
                    if(scope.data.maintainability < 50){
                        scope.maintainabilityImage = "green_arrow";
                    }else{
                        scope.maintainabilityImage = "red_arrow";
                    }
                } else{
                    scope.maintainabilityImage = "blue_arrow";
                }
            }
        };
    };
});