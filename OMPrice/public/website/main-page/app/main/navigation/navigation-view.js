define(["backbone","marionette","underscore","app/store/collections/markets/collection","app/store/collections/brands/collection","text!./template/navigation-template.html","tendina"],function(e,t,a,n,i,s){var l=t.ItemView.extend({template:function(e){return a.template(s)(e)},markets:n,brands:i,templateHelpers:function(){return console.log("template helpers"),{markets:this.markets.toJSON(),brands:this.brands.toJSON()}},initialize:function(){var e=this;this.markets.fetch({success:function(){e.render()}}),this.brands.fetch({success:function(){e.render()}})},selectPath:function(e,t,a){this.$el.find("li[data-market="+e+"]").addClass("selected").find("ul:first").css({display:"block"}),this.$el.find("li[data-section="+t+"]").addClass("selected").find("ul:first").css({display:"block"}),this.$el.find("li[data-category] a").removeClass("active"),this.$el.find("li[data-category="+a+"] a").addClass("active")},onRender:function(){this.$el.find(".nav-markets .market-navigation").tendina("destroy"),this.$el.find(".nav-markets .market-navigation").tendina({animate:!0,speed:500,onHover:!1,hoverDelay:300,openCallback:function(){},closeCallback:function(){}})}});return l});