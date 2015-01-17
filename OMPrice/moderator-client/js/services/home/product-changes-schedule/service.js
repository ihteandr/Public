define([], function(){
    return ["$http", "$q", function($http, $q){
        function getChangesSchedule(offset){
            offset = offset || 0;
            var deferred = $q.defer();
            $http.get("/products/tmp?offset=" + offset)
                .success(function(response){
                    if(response.status == "success"){
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response);
                    }
                })
                .error(function(response){
                    deferred.reject(response);
                });
            return deferred.promise;
        }
        return {
            getChangesSchedule: getChangesSchedule
        };
    }];
});