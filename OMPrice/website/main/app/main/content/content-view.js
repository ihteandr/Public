define([
    'marionette',
    'underscore',
    'app/store/collections/products/collection',
    './views/product/product-view',
    'text!./template/content-template.html'
], function(Marionette, _, Products, ProductView, ContentTemplate){
    var ContentView = Marionette.CompositeView.extend({
        template: function(model){
            return _.template(ContentTemplate)(model)
        },
        childViewContainer: ".product-list",
        collection: Products,
        childView: ProductView,
        initialize: function(){
            console.log("initialize");
            this.collection.bind("reset", this.render, this);
        }
    });
    return ContentView;
});