define(['jquery', 'BaseController'], function($, BaseController){

    var PopupCreateBaseController = BaseController.extend({
        validator: function(){return true;},
        init: function(scope, title, validator, errorMsg, close){
            validator && (this.validator = validator);
            this.title = title;
            this.errorMsg = errorMsg;
            this.closePromise = close;
            this._super(scope);
        },
        handleKeyUp:function(e){
            if(e.keyCode == 13){
                this.$scope.save();
            }
        },
        save: function(){
            if(this.$scope.value && this.validator(this.$scope.value)){
                this.close({
                    answer: 1,
                    name: this.$scope.value
                });
            } else {
                this.$scope.error = true;
                $("#base-create-input").parent().addClass("has-error");
            }
        },
        close: function(data){
            this.closePromise(data || {
                answer: -1
            }, 500);
            setTimeout(function(){
                $(".modal-backdrop").remove();
                $("body").removeClass("modal-open");
            }, 600);
        },
        defineScope: function(){
            this.$scope.value = "";
            this.$scope.title = this.title;
            this.$scope.error = false;
            this.$scope.errorMsg = this.errorMsg;
            this.$scope.handleKeyUp = this.handleKeyUp.bind(this);
            this.$scope.save = this.save.bind(this);
            this.$scope.close = this.close.bind(this);
        }
    });
    PopupCreateBaseController.$inject = ["$scope", "title", "validator", "errorMsg", "close"];

    return PopupCreateBaseController;
});