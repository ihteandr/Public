define([
    'cloud-router'
], function(CloudRouter){
    var SystemRouter = new CloudRouter({
        routes: {
            'signIn': 'signIn',
            'register': 'register'
        },
        signIn: function(){

        },
        register: function(){

        }
    });

    return SystemRouter;
});