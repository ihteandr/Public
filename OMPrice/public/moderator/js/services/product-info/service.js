define([],function(){return["$http","$q",function(e,t){function r(r,n){var u=t.defer();return e.get(r,{params:n}).success(function(e){if("success"==e.status){var t;t=e.data&&e.data.products?e.data.products[0]:e.data,u.resolve(t)}else u.reject(e.error)}).error(function(e){u.reject(e)}),u.promise}function n(e){var t,n={full:!0};return e._id?t="/products/"+e._id:(t="/products",e.ean?n.ean=e.ean:n.name=e.name),r(t,n)}function u(e){return r("/product/tmp/"+e)}function a(){return r("/markets")}function o(e){var n=t.defer();return o.timeout&&clearTimeout(o.timeout),o.timeout=setTimeout(function(){r("/sections",{market:e}).then(n.resolve,n.reject),clearTimeout(o.timeout)},500),n.promise}function i(e){var n=t.defer();return i.timeout&&clearTimeout(i.timeout),i.timeout=setTimeout(function(){r("/categories",{section:e}).then(n.resolve,n.reject),clearTimeout(i.timeout)},500),n.promise}function s(e){var n=t.defer();return s.timeout&&clearTimeout(s.timeout),s.timeout=setTimeout(function(){r("/families",{category:e}).then(n.resolve,n.reject),clearTimeout(s.timeout)},500),n.promise}function c(){return r("/countries",{full:!0})}function d(){return r("/brands")}function m(){return r("/bulkUnits")}function f(r,n){var u;if(n)u={url:"/products/temp/accept",data:{ean:r.product.ean},method:"PUT"};else{var a=r.product,o=r.newImages;u={transformRequest:angular.identity,headers:{"Content-Type":void 0}};var i=new FormData;a._id?(u.url="/products/"+a._id,u.method="PUT"):(u.url="/products",u.method="POST"),a.name&&"undefined"!=a.name&&i.append("name",a.name),i.append("category",a.category),i.append("details",JSON.stringify(a.details)),i.append("ean",a.ean),i.append("family",a.family),i.append("market",a.market),i.append("section",a.section),a.status&&"undefined"!=a.status&&i.append("status",a.status);for(var s in o)i.append("file"+s,o[s].file,"file"+s);u.data=i}var c=t.defer();return e(u).success(function(e){"success"==e.status?c.resolve(e.data):c.reject(e)}).error(c.reject),c.promise}return{getProduct:n,getTmpProduct:u,getMarkets:a,getSections:o,getCategories:i,getFamilies:s,getCountries:c,getBrands:d,getBulkUnits:m,saveProduct:f}}]});