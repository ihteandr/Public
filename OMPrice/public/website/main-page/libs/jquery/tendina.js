(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t=[].slice;!function(n){var s;return s=function(){function t(t,s){this._eventHandler=e(this._eventHandler,this),this.options=n.extend({},this.defaults,s),this.$el=n(t),this.elSelector=this._getSelector(this.$el),this.$el.addClass("tendina"),this.linkSelector=""+this.elSelector+" a",this.$listElements=n(this.linkSelector).parent("li"),this._hideSubmenus(),this.mouseEvent=this.options.onHover===!0?"mouseenter.tendina":"click.tendina",this._bindEvents(),null!==this.options.activeMenu&&this._openActiveMenu(this.options.activeMenu)}return t.prototype.defaults={animate:!0,speed:500,onHover:!1,hoverDelay:200,activeMenu:null},t.prototype._bindEvents=function(){return n(document).on(this.mouseEvent,this.linkSelector,this._eventHandler)},t.prototype._unbindEvents=function(){return n(document).off(this.mouseEvent)},t.prototype._getSelector=function(e){var t,s,i;return s=null!=(i=n(e).attr("class"))?i.split(" ")[0]:void 0,t=n(e).attr("id"),void 0!==t?"#"+t:"."+s},t.prototype._isFirstLevel=function(e){return n(e).parent().parent().hasClass("tendina")?!0:void 0},t.prototype._eventHandler=function(e){var t;return t=e.currentTarget,this._hasChildenAndIsHidden(t)?(e.preventDefault(),this.options.onHover?setTimeout(function(e){return function(){return n(t).is(":hover")?e._openSubmenu(t):void 0}}(this),this.options.hoverDelay):this._openSubmenu(t)):this._isCurrentlyOpen(t)&&(e.preventDefault(),!this.options.onHover)?this._closeSubmenu(t):void 0},t.prototype._openSubmenu=function(e){var t,s;return s=n(e).next("ul"),t=this.$el.find("> .selected ul").not(s).not(s.parents("ul")),n(e).parent("li").addClass("selected"),this._close(t),this.$el.find(".selected").not(s.parents("li")).removeClass("selected"),this._open(s),this.options.openCallback?this.options.openCallback(n(e).parent()):void 0},t.prototype._closeSubmenu=function(e){var t,s;return s=n(e).next("ul"),t=s.find("li.selected"),n(e).parent().removeClass("selected"),this._close(s),t.removeClass("selected"),this._close(t.find("ul")),this.options.closeCallback?this.options.closeCallback(n(e).parent()):void 0},t.prototype._open=function(e){return this.options.animate?e.stop(!0,!0).slideDown(this.options.speed):e.show()},t.prototype._close=function(e){return this.options.animate?e.stop(!0,!0).slideUp(this.options.speed):e.hide()},t.prototype._hasChildenAndIsHidden=function(e){return n(e).next("ul").length>0&&n(e).next("ul").is(":hidden")},t.prototype._isCurrentlyOpen=function(e){return n(e).parent().hasClass("selected")},t.prototype._hideSubmenus=function(){return this.$el.find("ul").hide()},t.prototype._showSubmenus=function(){return this.$el.find("ul").show(),this.$el.find("li").addClass("selected")},t.prototype._openActiveMenu=function(e){var t,n;return t=e instanceof jQuery?e:this.$el.find(e),n=t.closest("ul").parents("li").find("> a"),this._hasChildenAndIsHidden(n)?n.next("ul").show():t.next("ul").show(),t.parent().addClass("selected"),n.parent().addClass("selected")},t.prototype.destroy=function(){return this.$el.removeData("tendina"),this._unbindEvents(),this._showSubmenus(),this.$el.removeClass("tendina"),this.$el.find(".selected").removeClass("selected")},t.prototype.hideAll=function(){return this._hideSubmenus()},t.prototype.showAll=function(){return this._showSubmenus()},t}(),n.fn.extend({tendina:function(){var e,i;return i=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],this.each(function(){var t,o;return t=n(this),o=t.data("tendina"),o||t.data("tendina",o=new s(this,i)),"string"==typeof i?o[i].apply(o,e):void 0})}})}(window.jQuery,window)}).call(this);