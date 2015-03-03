define([
    'backbone',
    'marionette',
    'app/store/collections/markets/collection',
    'app/store/models/user/model',
    'router/system-router',
    'text!./template/header-template.html'
], function(Backbone, Marionette, markets, user, SystemRouter, HeaderTemplate){
    var HeaderView = Marionette.CompositeView.extend({
        template: function(model){
            return _.template(HeaderTemplate)(model)
        },
        templateHelpers: function(){
            return {
                user: user.toJSON(),
                mode: this.mode,
                market: this.market,
                section: this.section,
                category: this.category,
                address: this.address
            };
        },
        market: null,
        section: null,
        category: null,
        markets: markets,
        address: null,
        mode: "default",
        model: user,
        modelEvents: {
            "login": "loggedMode",
            "logout": "defaultMode"
        },
        loggedMode: function(){
            this.mode = "logged";
            this.render();
        },
        defaultMode: function(){
            this.mode = "default";
            this.render();
        },
        setAddress: function(address){
            this.address = address;
            this.render();
        },

        setProductsCategory: function(marketID, sectionID, categoryID){
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
        },
        onRender: function(){
            SystemRouter.run();
            if(this.mode == "logged"){
                this.$("button.dropdown-toggle").dropdown();
            }
        }
    });

    return HeaderView;
});