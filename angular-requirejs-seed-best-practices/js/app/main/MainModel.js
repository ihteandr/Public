define(["Class", "BaseModel"], function(Class, BaseModel){
    var MainModel = BaseModel.extend({
        _mainService: null,

        init: function(){

        }
    });
    var MainModelProvider = Class.extend({
        instance: new MainModel(),

        $get: ["MainService", function(MainService){
            this.instance._mainService = MainService;
            return this.instance;
        }]
    });

    return MainModelProvider;
});