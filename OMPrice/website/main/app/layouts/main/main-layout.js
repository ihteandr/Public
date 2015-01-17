define([
    'backbone',
    'marionette',
    'app/main/navigation/navigation-view',
    'app/main/content/content-view',
    'app/main/basket/basket-view',
    'text!./template/main-layout-template.html'
], function(Backbone, Marionette, NavigationView, ContentView, BasketView, Template){
    var MainLayout = Marionette.LayoutView.extend({
        template: Template,
        regions: {
            navPanel: '#nav-panel',
            contentPanel: '#main-content',
            basketPanel: '#basket-panel'
        },
        onBeforeShow: function(){
            this.navigation = new NavigationView();
            this.content = new ContentView();
            this.basket = new BasketView();
            this.getRegion('navPanel').show(this.navigation);
            this.getRegion('contentPanel').show(this.content);
            this.getRegion('basketPanel').show(this.basket);
        }
    });

    return MainLayout;
});