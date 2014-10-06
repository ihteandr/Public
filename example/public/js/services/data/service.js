define([], function () {
    "use strict";
    return ['$http', function ($http) {
        return {
            getData: function(){
                return $http({method: 'GET', url: '/data'});
            }
        };
    }];
});
