define([
    'backbone',
    'marionette',
    './layouts/main/main-layout',
    './header/view/header-view'
], function(Backbone, Marionette, MainLayout, HeaderView){
    var App = new Marionette.Application({
        container: "body",
        headerView: null,
        mainLayout: null
    });

    App.addRegions({
        main: "#main",
        header: "#header"
    });

    App.addInitializer(function(options){
        this.headerView = new HeaderView();
        this.mainLayout = new MainLayout();
        this.getRegion('header').show(this.headerView);
        this.getRegion('main').show(this.mainLayout);
    });

    App.on('start', function(){
        Backbone.history.start();
        this.systemRouter.run();
    });
    return App;
});