require.config({
    paths: {
        "Class": "libs/class",
        "BaseController": "base/BaseController",
        "BaseRouter": "base/BaseRouter",
        "EventDispatcher": "base/EventDispatcher",
        "BaseModel": "base/BaseModel",
        "jquery": "libs/jquery/jquery.min",
        "lodash": "libs/lodash/lodash.min",
        "angular": "libs/angular/angular-main",
        "Bootstrap": "libs/bootstrap/js/bootstrap.min",
        "templates": "../templates"
    },
    shim:{
        Bootstrap: {
            deps: ["jquery"]
        }
    }
});

require([
    "app/app",
    "config/config",
    "router/router"
], function(App, Config, Router){
    App.initialize();
    Config.setup(App.module);
    new Router(App.module);
});