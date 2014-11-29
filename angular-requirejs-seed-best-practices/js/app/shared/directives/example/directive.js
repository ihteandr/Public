define(["BaseController"], function(BaseController){
    var ExampleDirective = BaseController.extend({
        _elm: null,
        init: function(scope, element){
            this._elm = element;
            this._super(scope)
        }
    });

    return [function(){
        return {
            restrict: "EA",
            scope: true,
            template: "<h1>Test Example Directive</h1>",
            link: function($scope, element, attrs){
                new ExampleDirective($scope, element);
            }
        };
    }];
});