define(["jquery","text!templates/main/pages/product-info/product-image/template.html","jcarousel"],function(e,t){return function(){return{restrict:"EA",template:t,scope:{images:"=",newImages:"="},link:function(t,a){t.$watch("images",function(){setTimeout(function(){e(a[0]).find(".jcarousel").jcarousel(),e(".jcarousel-pagination").on("jcarouselpagination:active","a",function(){e(this).addClass("active")}).on("jcarouselpagination:inactive","a",function(){e(this).removeClass("active")}).jcarouselPagination({item:function(e){return'<a class="link">'+e+"</a>"}})},1e3)})}}}});