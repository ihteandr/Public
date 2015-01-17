define([
    'backbone',
    'marionette',
    'underscore',
    'app/store/collections/markets/collection',
    'app/store/collections/brands/collection',
    'text!./template/navigation-template.html',
    'tendina'
], function(Backbone, Marionette, _, Markets, Brands, NavigationTemplate){
    var NavigationView = Marionette.ItemView.extend({
        template: function(serializedModel){
            return _.template(NavigationTemplate)(serializedModel);
        },
        markets: Markets,
        brands: Brands,
        templateHelpers: function(){
            console.log("template helpers");
            return {
                markets: this.markets.toJSON(),
                brands: this.brands.toJSON()
            };
        },
        initialize: function(){
            var self = this;
            this.markets.fetch({
                success: function(){
                    self.render();
                }
            });
            this.brands.fetch({
                success: function(){
                    self.render();
                }
            });
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