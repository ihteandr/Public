define(["Class"], function(Class){
    var ExampleService = Class.extend({
        init: function($http){
            this.$http = $http;
        }
    });
    ExampleService.$inject = ["$http"];
    return ExampleService;
});