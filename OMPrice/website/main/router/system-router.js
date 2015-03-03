define([
    'jquery',
    'app/store/models/user/model',
    'cloud-router',
    'app/shared-views/register/register-view',
    'app/shared-views/signIn/signIn-view'
], function($, user, CloudRouter, RegisterView, SignInView){
    var SystemRouter = new CloudRouter({
        routes: {
            '/signIn': 'signIn',
            '/signOut': 'signOut',
            '/register': 'register'
        },
        signOut: function(){
            $.ajax({
                url: "/logout",
                type: "POST",
                success: function(){
                    window.localStorage.removeItem("user");
                    user.trigger("logout");
                    user.clear();
                }
            });
        },
        signIn: function(clearFields){
            var signInView = new SignInView({
                clearFields: clearFields
            });
            signInView.render();
            $("body").append(signInView.$el);
            signInView.$el.modal({
                show: true
            });
        },
        register: function(){
            var registerView = new RegisterView();
            registerView.render();
            $("body").append(registerView.$el);
            registerView.$el.modal({
                show: true
            });
            registerView.once("registered", function(){
                this.signIn(true);
            }, this);
        }
    });

    return SystemRouter;
});