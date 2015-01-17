define([
    'backbone',
    './model/model'
], function(Backbone, ProductModel){
    var ProductCollection = Backbone.Collection.extend({
        model: ProductModel,
        url: "/products",
        total: 0,
        parse: function(response){
            this.total = response.data.total;
            return response.data.products;
        },

        sync: function(method, model, options){
            if(method == 'read'){
                options.data = options.data || {};
                options.data.full = true;
                if(this.category){
                    options.data.category = this.category;
                }
                if(this.section){
                    options.data.section = this.section;
                }
                if(this.market){
                    options.data.market = this.market;
                }
            }
            return Backbone.sync(method, model, options);
        }
    });

    return new ProductCollection();
});
