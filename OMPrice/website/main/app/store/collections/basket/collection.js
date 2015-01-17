define([
    'backbone',
    '../products/model/model'
], function(Backbone, ProductModel){
    var Basket = Backbone.Collection.extend({
        model: ProductModel
    });

    return new Basket();
});