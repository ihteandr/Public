define([
    "text!templates/details/item/build/template.html"
],function(Template){
    return function(){
        return {
            restrict: "A",
            template: Template,
            scope:{
                "data": "=data"
            },
            link: function(scope){
                scope.formatedTime = moment(parseInt(scope.data.time)).format(" hh:mm a - MM/DD/YYYY");
            }
        };
    };
});