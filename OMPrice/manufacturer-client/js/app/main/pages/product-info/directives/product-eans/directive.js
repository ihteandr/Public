define([
    'jquery',
    'lodash',
    'BaseController',
    "text!templates/main/pages/product-info/product-eans/template.html",
    "text!templates/popups/create/base/template.html",
    'Bootstrap'
], function($, _, BaseController, Template, EanCreateTemplate){
    var ProductEansController = BaseController.extend({
        _modalService: null,
        init: function(scope, ModalService){
            this._super(scope);
            this._modalService = ModalService;
        },
        addEan: function(){
            var self = this;
            this._modalService.showModal({
                template: EanCreateTemplate,
                controller: "popupCreateBaseController",
                inputs: {
                    title: "Создать EAN",
                    validator: function(value){
                        return (/\d+/igm).test(value);
                    },
                    errorMsg: "EAN может содержать только цифры"
                }
            }).then(function(modal){
                $(modal.element[0]).modal();
                setTimeout(function(){$(modal.element[0]).find("input").focus();}, 200);
                modal.close.then(function(result){
                    if(result.answer == 1){
                        self.$scope.tmpEans.push(result.name);
                        self.$scope.tmpEan = self.$scope.tmpEans.join(",");
                    }
                });
            });
        },
        removeEan: function(e){
            var r_ean = $(e.target).attr("data-ean");
            this.$scope.eans = _.filter(this.$scope.eans, function(ean){
                return ean != r_ean;
            });
            this.$scope.tmpEans = _.filter(this.$scope.tmpEans, function(ean){
                return ean != r_ean;
            });
            this.$scope.ean = this.$scope.eans.join(",");
            this.$scope.tmpEan = this.$scope.tmpEans.join(",");
        },
        defineScope: function(){
            this.$scope.tmpEans = this.$scope.tmpEans || [];
            this.$scope.addEan = this.addEan.bind(this);
            this.$scope.removeEan = this.removeEan.bind(this);
        },
        updateTmpEans: function(newValue, oldValue){
            if(typeof this.$scope.tmpEan != "undefined"){
                this.$scope.tmpEans = _.difference(this.$scope.tmpEan.split(","), this.$scope.eans);
            }
        },
        updateEans: function(){
            if(typeof this.$scope.ean != "undefined"){
                this.$scope.eans = this.$scope.ean.split(",");
            }
        },
        defineListeners: function(){
            this._super();
            this.$scope.$watch("ean", this.updateEans.bind(this));
            this.$scope.$watch("tmpEan", this.updateTmpEans.bind(this));
        },
        destroy: function(){
        }
    });
    ProductEansController.$inject = ["$scope", "ModalService"];
    return function(){
        return {
            restrict: "EA",
            replace: true,
            template:Template,
            scope:{
                "ean":"=",
                "tmpEan": "="
            },
            controller: ProductEansController
        };
    };
});