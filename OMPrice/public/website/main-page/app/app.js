define(["backbone","marionette","./layouts/main/main-layout","./header/view/header-view"],function(e,i,n,a){var t=new i.Application({container:"body",headerView:null,mainLayout:null});return t.addRegions({main:"#main",header:"#header"}),t.addInitializer(function(){this.headerView=new a,this.mainLayout=new n,this.getRegion("header").show(this.headerView),this.getRegion("main").show(this.mainLayout)}),t.on("start",function(){e.history.start(),this.systemRouter.run()}),t});