define([
    "text!templates/main/pages/home/template.html",
    "text!templates/main/pages/product-info/template.html",
    "text!templates/main/pages/shops/template.html"
],function(HomeTemplate, ProductInfoTemplate, ShopsTemplate){
  return {
      home: {
          route: "/home",
          template: HomeTemplate,
          controller: "homeController"
      },
      productWithProperty: {
          route: "/product/:idOrEanOrName",
          template: ProductInfoTemplate,
          controller: "productInfoController"
      },
      product: {
          route: "/product",
          template: ProductInfoTemplate,
          controller: "productInfoController"
      },
      shops: {
          route: "/shops",
          template: ShopsTemplate,
          controller: "shopsController"
      }
  };
})
