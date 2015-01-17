define(["Class","BaseModel"], function(Class, BaseModel){
    var ExampleModel = BaseModel.extend({

    });
    var ExampleModelProvider = Class.extend({
        instance: new ExampleModel(),

        $get: [function(){
            return this.instance;
        }]
    });
    return ExampleModelProvider;
});