define([
    'backbone',
    'underscore',
    './model/model'
], function(Backbone, _, MarketModel){
    var MarketCollection = Backbone.Collection.extend({
        model: MarketModel,
        url: "/markets",
        sync: function(method, model, options){
            options.data = _.extend({full: true}, options.data || {});
            return Backbone.sync(method, model, options);
        }
    });

    return new MarketCollection();
});