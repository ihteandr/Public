require.config({
    //bareUrl: "app/",
    paths: {
        backbone: 'libs/backbone/backbone',
        marionette: 'libs/marionette/marionette',
        underscore: 'libs/underscore/underscore',
        'cloud-router': 'libs/cloud-router/cloud-router',
        jquery: 'libs/jquery/jquery',
        tendina: 'libs/jquery/tendina',
        twit_bootstrap: 'libs/bootstrap/js/bootstrap',
        text: 'libs/text'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        tendina: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        marionette: {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'Marionette'
        },
        twit_bootstrap: {
            deps: ['jquery']
        }
    },
    waitSeconds: 500
});
require([
    'jquery',
    'map/map-view'
], function($, MapView){
    $("body").append((new MapView).render().el);
    require([
        'jquery',
        'app/app',
        'config/config',
        'router/router',
        'router/system-router'
    ], function($, App, Config, Router, SystemRouter){
        $(function(){
            Config.setup();
            window.App = App;
            App.router = new Router();
            App.systemRouter = SystemRouter;
            App.start();
        });
    });
});