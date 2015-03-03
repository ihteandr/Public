define([
    'marionette',
    'underscore',
    'app/store/collections/basket/collection',
    'app/store/collections/shop/collection',
    'app/store/collections/markets/collection',
    'text!./template/basket-template.html',
    'twit_bootstrap'
], function(Marionette, _, basket, shops, markets, BasketTemplate){
    var BasketView = Marionette.CompositeView.extend({
        template: function(data){
            return _.template(BasketTemplate)(data);
        },
        templateHelpers: function(){
            var items = basket.toJSON();
            for(var i = 0, item; item = items[i];i++){
                var market = _.find(markets.toJSON(), function(market){
                    return market._id == item.product.market;
                });
                var section = _.find(market.sections, function(section){
                    return section._id == item.product.section;
                });
                item.section = section.name;
            }
            if(!this.selectedShop){
                this.selectedShop = shops.at(0) ? shops.at(0).toJSON() : undefined;
            }
            return {
                basket: _.groupBy(items, "section"),
                shops: shops.toJSON(),
                selectedShop: this.selectedShop
            };

        },
        events: {
            "click li[data-shop]": "selectShop"
        },
        selectShop: function(event){
            var shopID = event.currentTarget.getAttribute("data-shop");
            this.selectedShop = _.find(shops.toJSON(), function(shop){
                return shop._id == shopID;
            });
            this.render();
        },
        initialize: function(){
            var self = this;
            markets.bind("reset", this.render, this);
            basket.bind("reset", this.render, this);
            basket.bind("add", this.render, this);
            shops.bind("reset", this.render, this);
            basket.fetch({reset:true});
        },
        onRender: function(){
            this.$el.find(".basket-shop-list .dropdown-toggle").dropdown();
        }
    });

    return BasketView;
});
