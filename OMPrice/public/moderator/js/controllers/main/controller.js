define(["jquery"],function(a){return["$scope","$route","MainService",function(e,r,t){e.template={},t.checkAuthorization().then(function(a){e.template.url=a.data?"templates/main/page.html":"templates/main/login.html"},function(){a("body").growl({message:"Error on the Server."},{type:"danger"}),e.template.url="templates/main/login.html"});var s=function(){a("div[name=dataUserName]").addClass("has-error"),a("div[name=dataPassword]").addClass("has-error")},n=function(){var e=!0,r=a("#InputUser").val(),t=a("#InputPassword").val();return""===r.trim()?(e=!1,a("div[name=dataUserName]").addClass("has-error")):a("div[name=dataUserName]").removeClass("has-error"),""===t.trim()?(e=!1,a("div[name=dataPassword]").addClass("has-error")):a("div[name=dataPassword]").removeClass("has-error"),e?{username:r,password:t}:!1};e.handleKeyUp=function(a){13==a.keyCode&&e.submit()},e.submit=function(){var a=n();a&&t.tryLogin(a).then(function(a){"success"==a.status?(e.authorized=App.authorized=!0,App.user=a.data,e.template.url="templates/main/page.html",r.reload()):(e.error=!0,s())},function(){s(),e.error=!0})}}]});