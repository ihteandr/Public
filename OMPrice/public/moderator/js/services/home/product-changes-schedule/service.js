define([],function(){return["$http","$q",function(e,t){function r(r){r=r||0;var n=t.defer();return e.get("/products/tmp?offset="+r).success(function(e){"success"==e.status?n.resolve(e.data):n.reject(e)}).error(function(e){n.reject(e)}),n.promise}return{getChangesSchedule:r}}]});