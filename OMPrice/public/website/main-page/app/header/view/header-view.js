define(["backbone","marionette","app/store/collections/markets/collection","text!./template/header-template.html"],function(t,e,n,r){var i=e.CompositeView.extend({template:function(t){return _.template(r)(t)},templateHelpers:function(){return{market:this.market,section:this.section,category:this.category}},market:null,section:null,category:null,markets:n,setProductsCategory:function(t,e,n){console.log("markets ",this.markets.toJSON());var r=_.find(this.markets.toJSON(),function(e){return e._id==t}),i=_.find(r.sections,function(t){return t._id==e}),o=_.find(i.categories,function(t){return t._id==n});this.market=r.name,this.section=i.name,this.category=o.name,this.render()}});return i});