define([
    'backbone',
    'marionette',
    'app/app',
    'app/store/collections/products/collection',
    'app/store/collections/markets/collection'
], function(Backbone, Marionette, App, productCollection, markets){
    var Router = Backbone.Marionette.AppRouter.extend({
        routes: {
            "search/:name": "search",
            "search/:name/:page": "search",
            "": "main",
            ":market/:section/:category": "main",
            ":market/:section/:category/:page": "main"
        },
        _setProductDetails: function(market, section, category){
            if(market && section && category){
                App.headerView.setProductsCategory(market, section, category);
                App.mainLayout.navigation.selectPath(market, section, category);
            }

        },
        main: function(market, section, category, page){
            if(market && section && category) {
                productCollection.market = market;
                productCollection.section = section;
                productCollection.category = category;
            }
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
            productCollection.offset = page ? (page - 1)*25 : 0;
            productCollection.fetch({ reset: true });
        },
        search: function(name, page){
            delete productCollection.market;
            delete productCollection.section;
            delete productCollection.category;
            productCollection.offset = page ? (page - 1)*25 : 0;
            productCollection.search = name;
            productCollection.fetch({ reset: true });
        }
    });

    return Router;
});