define([],function(){return["$http","$q",function(e,t){function r(r){var o=t.defer();return e.get(r).success(function(e){"success"==e.status?o.resolve(e.data):o.reject(e)}).error(function(e){o.reject(e)}),o.promise}function o(){return r("/markets")}function i(e){var o=t.defer();return i.timeout&&clearTimeout(i.timeout),i.timeout=setTimeout(function(){r("/sections?market="+e).then(o.resolve,o.reject),clearTimeout(i.timeout)},500),o.promise}function u(e){var o=t.defer();return u.timeout&&clearTimeout(u.timeout),u.timeout=setTimeout(function(){r("/categories?section="+e).then(o.resolve,o.reject),clearTimeout(u.timeout)},500),o.promise}function n(e){var o=t.defer();return u.timeout&&clearTimeout(u.timeout),u.timeout=setTimeout(function(){r("/families?category="+e).then(o.resolve,o.reject),clearTimeout(u.timeout)},500),o.promise}function c(){return r("/countries")}function s(){return r("/brands")}return{getMarkets:o,getSections:i,getCategories:u,getFamilies:n,getCountries:c,getBrands:s}}]});