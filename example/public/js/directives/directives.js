define([
    // Standard Libs
    'jQuery',     // lib/jquery/jquery
    'Underscore', // lib/underscore/underscore
    'Angular',    // lib/angular/angular

    // Application Widgets
    //details item
    'directives/details/utils/progress/directive',
    'directives/details/utils/code-covered/directive',
    'directives/details/item/build/directive',
    'directives/details/item/chart/directive',
    'directives/details/item/metrics/directive',
    'directives/details/item/directive'
], function($, _, angular, ProgressDirective, CodeCoveredDirective, BuildDirective, ChartDirective,
            MetricsDirective, DetailsItemDirective){
    "use strict";

    var directives = {
        "detailsItemProgress": ProgressDirective,
        "detailsItemCodeCovered": CodeCoveredDirective,
        "detailsItemBuild": BuildDirective,
        "detailsItemChart": ChartDirective,
        "detailsItemMetrics": MetricsDirective,
        "detailsItem": DetailsItemDirective
    };

    var initialize = function (angModule) {
        _.each(directives,function(directive,name){
           angModule.directive(name,directive);
        });
    };

    return {
        initialize: initialize
    };
});
