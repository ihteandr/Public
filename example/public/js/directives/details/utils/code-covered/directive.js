define([
    "jQuery",
    "text!templates/details/utils/code-covered/template.html"
], function($,Template){
    return function(){
        return {
            restrict: "A",
            scope: {
                "value": "="
            },
            template: Template,
            link: function(scope, element){
                var lis = element.find("li"),
                    count = Math.round(scope.value/10);
                for(var i = 0; i < count; i++){
                    $(lis[i]).addClass("full");
                }

                if(scope.value >= 75){
                    scope.percentageColor = "green";
                } else if(scope.value >= 50){
                    scope.percentageColor = "yellow";
                } else {
                    scope.percentageColor = "red";
                }
            }
        };
    };
})