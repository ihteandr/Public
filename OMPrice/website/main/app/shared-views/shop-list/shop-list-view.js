define([
    'marionette',
    '../shop/shop-view',
    'text!./template/shop-list-template.html'
], function(Marionette, ShopView, Template){
    var ShopListView = Marionette.CompositeView.extend({
        template: Template,
        childView: ShopView,
        childViewContainer: '.shop-list'
    });

    return ShopListView;
});