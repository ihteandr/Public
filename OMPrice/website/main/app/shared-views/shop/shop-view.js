define([
    'marionette',
    'text!./template/shop-template.html'
], function(Marionette, Template){
    var ShopView = Marionette.ItemView.extend({
        template: Template,
        tagName: 'li'
    });

    return ShopView;
});