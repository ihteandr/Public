define(["backbone","marionette","app/app","app/store/collections/products/collection","app/store/collections/markets/collection"],function(t,e,o,a,n){var i=t.Marionette.AppRouter.extend({routes:{"":"main",":market/:section/:category":"main"},_setProductDetails:function(t,e,n){t&&e&&n&&(a.market=t,a.section=e,a.category=n,o.headerView.setProductsCategory(t,e,n),o.mainLayout.navigation.selectPath(t,e,n))},main:function(t,e,o){if(0==n.length)var i=this,c=setInterval(function(){n.length>0&&(clearInterval(c),i._setProductDetails(t,e,o))},1e3);else this._setProductDetails(t,e,o);a.fetch()}});return i});