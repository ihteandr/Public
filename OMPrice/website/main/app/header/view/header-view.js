define([
    'backbone',
    'marionette',
    'app/store/collections/markets/collection',
    'text!./template/header-template.html'
], function(Backbone, Marionette, markets, HeaderTemplate){
    var HeaderView = Marionette.CompositeView.extend({
        template: function(model){
            return _.template(HeaderTemplate)(model)
        },
        templateHelpers: function(){
            return {
                market: this.market,
                section: this.section,
                category: this.category
            };
        },
        market: null,
        section: null,
        category: null,
        markets: markets,
        setProductsCategory: function(marketID, sectionID, categoryID){
            console.log("markets ", this.markets.toJSON());
            var market = _.find(this.markets.toJSON(), function(market){
                return market._id == marketID;
            });
            var section = _.find(market.sections, function(section){
                return section._id == sectionID;
            });
            var category = _.find(section.categories, function(category){
                return category._id == categoryID;
            });
            this.market = market.name;
            this.section = section.name;
            this.category = category.name;
            this.render();
        }
    });

    return HeaderView;
});