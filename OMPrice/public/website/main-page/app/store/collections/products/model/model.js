define(["backbone","./prices/collection"],function(e,i){var n=e.Model.extend({init:function(){this.set("prices",new i(this.get("prices")))}});return n});