define(["backbone","./categories/collection"],function(e,t){var i=e.Model.extend({init:function(){this.set("categories",new t(this.get("categories")))}});return i});