define([
    "Underscore",
    "Moment"
], function(_, Moment){
    var INIT_DATA_TIMEOUT = 1000;
    return ["$scope","$routeParams", "DataService", function(scope, params, dataService){
        scope.items = [];
        function initData(){
            dataService.getData().success(function(data){
                scope.items = _.map(data, function(item){
                    if(item.timeStarted){
                        item.timeStarted = moment(parseInt(item.timeStarted)).format("MM/DD/YYYY hh:mm a");
                    }
                    item.selected = params.id;
                    return item
                });
                setTimeout(initData, INIT_DATA_TIMEOUT);
            });
        }
        initData();

    }];
});