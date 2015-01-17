define("BaseModel", ["Class", "EventDispatcher"], function(Class, EventDispatcher){
    var BaseModel = EventDispatcher.extend({
        storage: {},
        setStorage: function(storage){
            this.storage = storage;
        },
        get: function(property) {
            return this.storage[property];
        },
        set: function(property, value){
            if(typeof property == "object"){
                for(var key in property){
                    this.storage[key] = property[key];
                }
                return this;
            }else if(typeof property == "string"){
                this.storage[property] = value;
                return this;
            }
            throw new Error("BaseModel: first argument must be object or string");
        }
    });

    return BaseModel;
});