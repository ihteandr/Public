define([
    'lodash',
    './product-eans/directive',
    './product-image/directive',
    './product-image/upload-images/directive',
], function(_, ProductEansDirective, ProductImageDirective, UploadImagesDirective){
    var directives = {
        "productEans": ProductEansDirective,
        "productImage": ProductImageDirective,
        "uploadImages": UploadImagesDirective
    };

    var initialize = function(module){
        _.each(directives, function(definition, name){
            module.directive(name, definition);
        });
    };

    return {
        initialize: initialize
    };
});