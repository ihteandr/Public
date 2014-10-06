define([
    "Underscore",
    "text!templates/details/item/template.html"
], function(_, Template){
    return function(){
        return {
            restrict:"A",
            scope:{
                name: "=",
                owner: "=",
                timeStarted: "=timestarted",
                state: "=",
                metrics: "=",
                build: "=",
                unitTests: "=unittests",
                functionalTests: "=functionaltests",
                selected: "="
            },
            template: Template,
            link: function(scope){
                scope.checkShowProgress = function(){
                    return scope.selected != scope.name;
                };
                scope.checkOpen = function(){
                    return scope.selected == scope.name && !_.contains(["Pending"], scope.selected);
                };

                if(!_.contains(["Pending"], scope.selected)){
                    //counting metrics progress and status
                    if(scope.metrics){
                        scope.metrics.progress = 0;
                        if(scope.metrics.test){
                            scope.metrics.progress += 2.5;
                        }
                        if(scope.metrics.maintainability){
                            scope.metrics.progress += 2.5;
                        }
                        if(scope.metrics.security){
                            scope.metrics.progress += 2.5;
                        }
                        if(scope.metrics.workmanship){
                            scope.metrics.progress += 2.5;
                        }
                    }else {
                        scope.metrics = {};
                        scope.metrics.status = "pending";
                    }

                    //counting build progress
                    if(scope.build){
                        if(scope.build.status === "progress") {
                            scope.build.progress = 5;
                        }
                    } else {
                        scope.build = {};
                        scope.build.status = "pending";
                    }

                    //counting unit tests progress
                    if(scope.unitTests){
                        scope.unitTests.progress = 0;
                        if(scope.unitTests.pass){
                            scope.unitTests.progress += 3.3;
                        }
                        if(scope.unitTests.fail){
                            scope.unitTests.progress += 3.3;
                        }
                        if(scope.unitTests.codecovered){
                            scope.unitTests.progress += 3.3;
                        }
                    } else {
                        scope.unitTests = {};
                        scope.unitTests.status = "pending";
                    }

                    //counting functional tests progress
                    if(scope.functionalTests){
                        scope.functionalTests.progress = 0;
                        if(scope.functionalTests.pass){
                            scope.functionalTests.progress += 3.3;
                        }
                        if(scope.functionalTests.fail){
                            scope.functionalTests.progress += 3.3;
                        }
                        if(scope.functionalTests.codecovered){
                            scope.functionalTests.progress += 3.3;
                        }
                    } else {
                        scope.functionalTests = {};
                        scope.functionalTests.status = "pending";
                    }
                }

            }
        };
    };
});