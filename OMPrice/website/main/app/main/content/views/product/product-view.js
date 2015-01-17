define([
    'marionette',
    'underscore',
    'text!./template/product-template.html'
], function(Marionette, _, ProductTemplate){
    var ProductView = Marionette.ItemView.extend({
        template: function(model){
            return _.template(ProductTemplate)(model);
        },
        tabName: "div"
    });
    return ProductView;
});