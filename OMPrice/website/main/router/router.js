define([
    'backbone',
    'marionette',
    'app/app',
    'app/store/collections/products/collection',
    'app/store/collections/markets/collection'
], function(Backbone, Marionette, App, productCollection, markets){
    var Router = Backbone.Marionette.AppRouter.extend({
        routes: {
            "": "main",
            ":market/:section/:category": "main"
        },
        _setProductDetails: function(market, section, category){
            if(market && section && category){
                productCollection.market = market;
                productCollection.section = section;
                productCollection.category = category;
                App.headerView.setProductsCategory(market, section, category);
                App.mainLayout.navigation.selectPath(market, section, category);
            }

        },
        main: function(market, section, category){
            if(markets.length == 0){
                var self = this;
                var interval = setInterval(function(){
                    if(markets.length > 0){
                        clearInterval(interval);
                        self._setProductDetails(market, section, category);
                    }
                }, 1000);
            } else {
                this._setProductDetails(market, section, category);
            }
            productCollection.fetch();
        }
    });

    return Router;
});