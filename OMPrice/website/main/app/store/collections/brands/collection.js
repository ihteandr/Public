define([
    'backbone',
    './model/model'
], function(Backbone, BrandModel){
    var BrandCollection = Backbone.Collection.extend({
        model: BrandModel,
        url: '/brands'
    });

    return new BrandCollection();
});