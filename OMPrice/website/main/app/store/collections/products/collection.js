define([
    'backbone',
    './model/model',
    'app/store/collections/shop/collection'
], function(Backbone, ProductModel, shops){
    var ProductCollection = Backbone.Collection.extend({
        model: ProductModel,
        url: "/products",
        total: 0,
        offset: 0,
        parse: function(response){
            this.total = response.data.total;
            return response.data.products;
        },

        sync: function(method, model, options){
            if(method == 'read'){
                var shopsIds = shops.map(function(shop){
                    return shop.get("_id");
                });
                options.data = options.data || {};
                options.data.full = true;
                if(this.category){
                    options.data.category = this.category;
                }
                if(shopsIds.length > 0){
                    options.shops = shopsIds;
                }
                if(this.section){
                    options.data.section = this.section;
                }
                if(this.market){
                    options.data.market = this.market;
                }
                console.log("search ", this.search, " end");
                if(this.search){
                    options.data.name = this.search;
                }
                if(this.brands){
                    options.data.brands = this.brands;
                }
                options.data.offset = this.offset;
            }
            return Backbone.sync(method, model, options);
        }
    });

    return new ProductCollection();
});
