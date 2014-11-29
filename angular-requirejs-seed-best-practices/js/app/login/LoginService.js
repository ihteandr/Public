define(["Class"],function(Class){
    var LoginService = Class.extend({
        $http: null,
        init: function(http){
            this.$http = http;
        }
    });
    LoginService.$inject = ["$http"];
    return LoginService;
});