/**
 * Created by Vladimir on 10/27/13.
 */
require.config({
    baseUrl: 'app',
    paths: {
        'jquery': 'lib/jquery/dist/jquery',
        'angular': 'lib/angular/angular',
        'text': 'lib/requirejs-text/text'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'angular': {
            exports: 'angular',
            'deps': ['jquery']
        }
    }
});

require([
], function () { 
    
})