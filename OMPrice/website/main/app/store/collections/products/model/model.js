define([
    'backbone',
    './prices/collection'
], function(Backbone, PriceCollection){
    var ProductModel = Backbone.Model.extend({
        init: function(){
            this.set('prices', new PriceCollection(this.get('prices')));
        }
    });

    return ProductModel;
});