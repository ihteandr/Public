define([
    'backbone',
    'marionette',
    'underscore',
    'app/store/collections/products/collection',
    './views/product/product-view',
    'text!./template/content-template.html'
], function(Backbone, Marionette, _, Products, ProductView, ContentTemplate){
    var ContentView = Marionette.CompositeView.extend({
        template: function(data){
            return _.template(ContentTemplate)(data)
        },
        templateHelpers: function(){
            return {
                page: this.collection.offset/25 + 1,
                lastPage: Math.floor(this.collection.total/25) + 1,
                market: this.collection.market,
                section: this.collection.section,
                category: this.collection.category,
                name: this.collection.search
            };
        },
        childViewContainer: ".product-list",
        collection: Products,
        model: new Backbone.Model({ page: 0, lastPage:0 }),
        childView: ProductView,
        collectionEvents: {
            'reset': 'render'
        },
        events:{
            "keyup #search-input": "onKeyUp",
            "click #search": "search"
        },
        onKeyUp: function(e){
            if(e.keyCode == 13){
                this.search();
            }
        },
        search: function(){
            var name = this.$("#search-input").val();
            if(name){
                window.location.hash = "search/" + name;
            } else {
                window.location.hash = "search"
            }
        },
        initialize: function(){

        }
    });
    return ContentView;
});