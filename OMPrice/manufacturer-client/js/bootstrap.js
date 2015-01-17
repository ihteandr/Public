require.config({
    paths: {
        "Class": "libs/class",
        "BaseController": "base/BaseController",
        "BaseRouter": "base/BaseRouter",
        "EventDispatcher": "base/EventDispatcher",
        "BaseModel": "base/BaseModel",
        "jquery": "libs/jquery/jquery.min",
        "jcarousel": "libs/jquery/jcarousel/lib",
        "lodash": "libs/lodash/lodash.min",
        "Angular": "libs/angular/angular-main",
        "spin": "libs/spin/lib",
        "templates": "../templates",
        "Bootstrap": 'libs/bootstrap/js/bootstrap.min',
        "BootstrapGrowl": 'libs/bootstrap/js/bootstrap-growl.min'
    },
    shim:{
        "Bootstrap": {
            deps: ['jquery']
        },
        "BootstrapGrowl": {
            deps: ['Bootstrap', 'jquery']
        }
    }
});

require([
    "app/app",
], function(App){
    App.initialize();
});