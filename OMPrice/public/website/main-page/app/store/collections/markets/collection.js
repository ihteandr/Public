define(["backbone","underscore","./model/model"],function(e,n,t){var d=e.Collection.extend({model:t,url:"/markets",sync:function(t,d,o){return o.data=n.extend({full:!0},o.data||{}),e.sync(t,d,o)}});return new d});