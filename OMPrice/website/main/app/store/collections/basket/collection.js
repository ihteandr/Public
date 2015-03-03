define([
    'backbone',
    './model/model'
], function(Backbone, BasketProduct){
    var Basket = Backbone.Collection.extend({
        model: BasketProduct,
        url: '/basket',
        parse: function(response){
            if(response.data){
                return response.data.products;
            } else {
                return [];
            }
        }
    });

    return new Basket();
});