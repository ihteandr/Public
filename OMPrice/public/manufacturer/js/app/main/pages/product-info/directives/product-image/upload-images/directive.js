define(["jquery","lodash","text!templates/main/pages/product-info/product-image/upload-images/template.html"],function(e,n,a){return function(){return{require:["^productImage"],restrict:"EA",template:a,scope:{images:"=newImages"},link:function(n,a){var i=1,t=function(a){a.on("change",function(a){var i=e(a.target).attr("data-index");n.images[i]={file:a.target.files[0]}})},d=function(){var d=e('                                <li>                                    <span class="image-remove" data-index="'+ ++i+'">×</span>                                    <input type="file" name="upload-image" data-index="'+i+'" accept="image/*"/>                                </li>                                ');t(d.find("input")),e(a[0]).find("ul").append(d),e(a[0]).find(".image-remove").off(),e(a[0]).find(".image-remove").on("click",function(i){var t=e(i.target).attr("data-index");delete n.images[t],e(a[0]).find("input[data-index="+t+"]").parent().remove()}),e(a[0]).find("input[data-index="+i+"]").click()};t(e(a[0]).find("input[name=upload-image]")),e(a[0]).find("a[name=add-image]").on("click",function(){d()}),n.$on("resetUploader",function(){e(a[0]).find("ul").html(""),i=0,n.images=[],d()})},controller:["$scope",function(){}]}}});