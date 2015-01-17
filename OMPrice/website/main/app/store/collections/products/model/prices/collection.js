define([
    'backbone',
    './model/model'
], function(Backbone, PriceModel){
    var PriceCollection = Backbone.Collection.extend({
        model: PriceModel
    });

    return PriceCollection;
});