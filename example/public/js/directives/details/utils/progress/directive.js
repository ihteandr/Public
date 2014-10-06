define([
    'jQuery',
    'text!templates/details/utils/progress/template.html'
], function($, Template){
    //progress bar - has 10 steps
    return function(){
        return {
            restrict: "A",
            template: Template,
            scope: {
                "value": "=",
                "status": "="
            },
            link: function(scope, element){
                var lis = element.find("li");
                if(scope.status === "progress"){
                    var count = Math.round(scope.value);
                    for(var i = 0; i < count; i ++){
                        $(lis[i]).addClass("run");
                    }
                } else {
                    for(var i = 0; i < 10; i ++){
                        $(lis[i]).addClass(scope.status);
                    }
                }
            }
        };
    };
});