define(["BaseModel", "Class"], function(BaseModel, Class){
    var LoginModel = BaseModel.extend({
        _loginService: null,
        init: function(){

        }
    });
    var LoginModelProvider = Class.extend({
        instance: new LoginModel(),

        $get: ["LoginService", function(LoginService){
            this.instance._loginService = LoginService;
            return this.instance;
        }]
    });

    return LoginModelProvider;
});