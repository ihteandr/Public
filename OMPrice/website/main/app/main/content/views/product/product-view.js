define([
    'marionette',
    'underscore',
    'app/store/collections/basket/collection',
    'app/store/collections/shop/collection',
    'text!./template/product-template.html'
], function(Marionette, _, basket, shops, ProductTemplate){
    var ProductView = Marionette.ItemView.extend({
        template: function(model){
            return _.template(ProductTemplate)(model);
        },
        templateHelpers: function(){
            var shopsData = shops.toJSON();
            var model = this.model.toJSON();
            model.prices = _.filter(model.prices, function(price){
                return _.contains(_.pluck(shopsData, "_id"), price._id);
            });
            return model;
        },
        events:{
            "click button[name=add-product]": "addProduct"
        },
        addProduct: function(event){
            basket.add({
                product: this.model.toJSON(),
                count: this.$el.find("input[name=product-count]").val()
            });
        },
        tabName: "div",
        initialize: function(){
            shops.bind("reset", this.render, this);
        }
    });
    return ProductView;
});