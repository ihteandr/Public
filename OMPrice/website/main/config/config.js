define(['backbone'], function(Backbone){
    var setup = function(){
        Backbone.Collection.prototype.parse = function(response){
            return response.data;
        }
    };
    return {
        setup: setup
    };
});