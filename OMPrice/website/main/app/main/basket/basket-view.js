define([
    'marionette',
    'app/store/collections/basket/collection',
    'text!./template/basket-template.html'
], function(Marionette, Basket, BasketTemplate){
    var BasketView = Marionette.CompositeView.extend({
        template: BasketTemplate,
        collection: Basket
    });

    return BasketView;
});
