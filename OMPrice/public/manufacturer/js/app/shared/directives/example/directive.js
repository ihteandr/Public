define(["BaseController"],function(e){var n=e.extend({_elm:null,init:function(e,n){this._elm=n,this._super(e)}});return[function(){return{restrict:"EA",scope:!0,template:"<h1>Test Example Directive</h1>",link:function(e,t){new n(e,t)}}}]});