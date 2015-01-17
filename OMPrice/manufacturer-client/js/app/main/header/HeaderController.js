define([
    'jquery',
    'BaseController'
], function($, BaseController){
    var HeaderController = BaseController.extend({
        $location: null,
        init: function(scope, location){
            this._super(scope);
            this.$location = location;
        },

        search: function(){
            this.$location.path("/product/"+$(".main-header .search").val())
        },

        handleKeyUp: function(e){
            if(e.keyCode == 13){
                this.search();
            }
        },

        defineScope: function(){
            this._super();
            this.$scope.search = this.search.bind(this);
            this.$scope.handleKeyUp = this.handleKeyUp.bind(this);
        },

        destroy: function(){
            console.log("Header Scope destroyed");
        }
    });
    HeaderController.$inject = ["$scope", "$location"];

    return HeaderController;
});