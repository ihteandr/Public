define("EventDispatcher",["Class"],function(e){var t=e.extend({_listeners:{},addEventListener:function(e,t){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t)},removeEventListener:function(e,t){if(this._listeners[e]){var s=this._listeners[e].indexOf(t);-1!==s&&this._listeners[e].splice(s,1)}},dispatchEvent:function(){var e;if("string"!=typeof arguments[0])console.warn("EventDispatcher","First params must be an event type (String)");else{e=this._listeners[arguments[0]];for(var t in e)e[t].apply(null,Array.prototype.slice.apply(arguments,1))}}});return t});