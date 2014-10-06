define([
    "jQuery",
    "text!templates/details/item/chart/template.html"
], function($, Template){
    return function(){
        return {
            restrict: "A",
            scope: {
                "data": "=",
                "text": "="
            },
            template: Template,
            link: function(scope, element){
                var data = google.visualization.arrayToDataTable([
                    ['Tests', 'Percentage'],
                    ["Pass", scope.data.pass],
                    ["Fail", scope.data.fail]
                ]);

                var options = {
                    legend: 'none',
                    pieSliceText: 'value',
                    pieStartAngle: 135,
                    slices: {
                        0: { color: '#70ad47', textStyle: {color: "#000000"} },
                        1: { color: '#ed7d31', textStyle: {color: "#000000"} }
                    },
                    backgroundColor: 'transparent'
                };
                var chart = new google.visualization.PieChart($(element[0]).find('div[name=chart]')[0]);
                chart.draw(data, options);

                scope.passedTests = Math.round(scope.data.pass*100/(scope.data.pass+scope.data.fail));

                if(scope.passedTests >= 75){
                    scope.percentageColor = "green";
                } else if(scope.passedTests >= 50){
                    scope.percentageColor = "yellow";
                } else {
                    scope.percentageColor = "red";
                }

            }
        };
    };
})