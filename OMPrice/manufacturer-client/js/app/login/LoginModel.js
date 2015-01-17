define(["BaseModel", "Class"], function(BaseModel, Class){
    var LoginModel = BaseModel.extend({
        _service: null,
        init: function(){

        },
        tryLogin: function(data){
            return this._service.tryLogin(data);
        }
    });
    var LoginModelProvider = Class.extend({
        instance: new LoginModel(),

        $get: ["LoginService", function(LoginService){
            this.instance._service = LoginService;
            return this.instance;
        }]
    });

    return LoginModelProvider;
});