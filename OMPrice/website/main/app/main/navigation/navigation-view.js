define([
    'backbone',
    'marionette',
    'underscore',
    'app/store/collections/markets/collection',
    'app/store/collections/brands/collection',
    'app/store/collections/products/collection',
    'text!./template/navigation-template.html',
    'tendina'
], function(Backbone, Marionette, _, Markets, Brands, Products, NavigationTemplate){
    var NavigationView = Marionette.ItemView.extend({
        template: function(serializedModel){
            return _.template(NavigationTemplate)(serializedModel);
        },
        events: {
            "change input[name=brands]": "onChangeBrands"
        },
        markets: Markets,
        brands: Brands,
        templateHelpers: function(){
            return {
                markets: this.markets.toJSON(),
                brands: this.brands.toJSON()
            };
        },
        initialize: function(){
            var self = this;
            this.markets.bind("reset", this.render, this);
            this.brands.bind("reset", this.render, this);
            this.markets.fetch({reset:true});
            this.brands.fetch({reset:true});
        },
        onChangeBrands: function(event){
            var brands = [];
            this.$("input[name=brands]:checked").each(function(index, element){
                brands.push(element.getAttribute("data-id"));
            });
            Products.brands = brands;
            Products.fetch({reset: true});
        },
        selectPath: function(market, section, category){
            this.$el.find("li[data-market=" + market + "]").addClass('selected').find("ul:first").css({display:"block"});
            this.$el.find("li[data-section=" + section + "]").addClass('selected').find("ul:first").css({display:"block"});;
            this.$el.find("li[data-category] a").removeClass('active');
            this.$el.find("li[data-category=" + category + "] a").addClass('active');
        },
        onRender: function(){
            this.$el.find('.nav-markets .market-navigation').tendina('destroy');
            this.$el.find('.nav-markets .market-navigation').tendina({
                animate: true,
                speed: 500,
                onHover: false,
                hoverDelay: 300,
                openCallback: function(el) {
                },
                closeCallback: function(el) {
                }
            });
        }
    });

    return NavigationView;
});