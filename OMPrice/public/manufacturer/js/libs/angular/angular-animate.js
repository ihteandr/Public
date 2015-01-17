!function(n,t,e){"use strict";t.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){var n="$$ngAnimateChildren";return function(e,a,i){var r=i.ngAnimateChildren;t.isString(r)&&0===r.length?a.data(n,!0):e.$watch(r,function(t){a.data(n,!!t)})}}).factory("$$animateReflow",["$$rAF","$document",function(n,t){var e=t[0].body;return function(t){return n(function(){e.offsetWidth+1;t()})}}]).config(["$provide","$animateProvider",function(a,i){function r(n){for(var t=0;t<n.length;t++){var e=n[t];if(e.nodeType==p)return e}}function s(n){return n&&t.element(n)}function o(n){return t.element(r(n))}function u(n,t){return r(n)==r(t)}var l=t.noop,c=t.forEach,f=i.$$selectors,v=t.isArray,d=t.isString,m=t.isObject,p=1,g="$$ngAnimateState",C="$$ngAnimateChildren",h="ng-animate",$={running:!0};a.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest",function(n,e,a,p,b,y,D,A,w){function k(n,t){var e=n.data(g)||{};return t&&(e.running=!0,e.structural=!0,n.data(g,e)),e.disabled||e.running&&e.structural}function x(n){var t,a=e.defer();return a.promise.$$cancelFn=function(){t&&t()},D.$$postDigest(function(){t=n(function(){a.resolve()})}),a.promise}function S(n){return m(n)?(n.tempClasses&&d(n.tempClasses)&&(n.tempClasses=n.tempClasses.split(/\s+/)),n):void 0}function B(n,t,e){e=e||{};var a={};c(e,function(n,t){c(t.split(" "),function(t){a[t]=n})});var i=Object.create(null);c((n.attr("class")||"").split(/\s+/),function(n){i[n]=!0});var r=[],s=[];return c(t.classes,function(n,t){var e=i[t],o=a[t]||{};n===!1?(e||"addClass"==o.event)&&s.push(t):n===!0&&(e&&"removeClass"!=o.event||r.push(t))}),r.length+s.length>0&&[r.join(" "),s.join(" ")]}function F(n){if(n){var t=[],e={},i=n.substr(1).split(".");(p.transitions||p.animations)&&t.push(a.get(f[""]));for(var r=0;r<i.length;r++){var s=i[r],o=f[s];o&&!e[s]&&(t.push(a.get(o)),e[s]=!0)}return t}}function M(n,e,a,i){function r(n,t){var e=n[t],a=n["before"+t.charAt(0).toUpperCase()+t.substr(1)];return e||a?("leave"==t&&(a=e,e=null),D.push({event:t,fn:e}),$.push({event:t,fn:a}),!0):void 0}function s(t,e,r){function s(n){if(e){if((e[n]||l)(),++v<o.length)return;e=null}r()}var o=[];c(t,function(n){n.fn&&o.push(n)});var v=0;c(o,function(t,r){var o=function(){s(r)};switch(t.event){case"setClass":e.push(t.fn(n,u,f,o,i));break;case"animate":e.push(t.fn(n,a,i.from,i.to,o));break;case"addClass":e.push(t.fn(n,u||a,o,i));break;case"removeClass":e.push(t.fn(n,f||a,o,i));break;default:e.push(t.fn(n,o,i))}}),e&&0===e.length&&r()}var o=n[0];if(o){i&&(i.to=i.to||{},i.from=i.from||{});var u,f;v(a)&&(u=a[0],f=a[1],u?f?a=u+" "+f:(a=u,e="addClass"):(a=f,e="removeClass"));var d="setClass"==e,m=d||"addClass"==e||"removeClass"==e||"animate"==e,p=n.attr("class"),g=p+" "+a;if(j(g)){var C=l,h=[],$=[],b=l,y=[],D=[],A=(" "+g).replace(/\s+/g,".");return c(F(A),function(n){var t=r(n,e);!t&&d&&(r(n,"addClass"),r(n,"removeClass"))}),{node:o,event:e,className:a,isClassBased:m,isSetClassOperation:d,applyStyles:function(){i&&n.css(t.extend(i.from||{},i.to||{}))},before:function(n){C=n,s($,h,function(){C=l,n()})},after:function(n){b=n,s(D,y,function(){b=l,n()})},cancel:function(){h&&(c(h,function(n){(n||l)(!0)}),C(!0)),y&&(c(y,function(n){(n||l)(!0)}),b(!0))}}}}}function E(n,e,a,i,r,s,o,u){function f(t){var i="$animate:"+t;D&&D[i]&&D[i].length>0&&y(function(){a.triggerHandler(i,{event:n,className:e})})}function v(){f("before")}function d(){f("after")}function m(){f("close"),u()}function p(){p.hasBeenRun||(p.hasBeenRun=!0,s())}function C(){if(!C.hasBeenRun){b&&b.applyStyles(),C.hasBeenRun=!0,o&&o.tempClasses&&c(o.tempClasses,function(n){a.removeClass(n)});var t=a.data(g);t&&(b&&b.isClassBased?N(a,e):(y(function(){var t=a.data(g)||{};R==t.index&&N(a,e,n)}),a.data(g,t))),m()}}var $=l,b=M(a,n,e,o);if(!b)return p(),v(),d(),C(),$;n=b.event,e=b.className;var D=t.element._data(b.node);if(D=D&&D.events,i||(i=r?r.parent():a.parent()),O(a,i))return p(),v(),d(),C(),$;var A=a.data(g)||{},w=A.active||{},k=A.totalActive||0,x=A.last,S=!1;if(k>0){var B=[];if(b.isClassBased){if("setClass"==x.event)B.push(x),N(a,e);else if(w[e]){var F=w[e];F.event==n?S=!0:(B.push(F),N(a,e))}}else if("leave"==n&&w["ng-leave"])S=!0;else{for(var E in w)B.push(w[E]);A={},N(a,!0)}B.length>0&&c(B,function(n){n.cancel()})}if(!b.isClassBased||b.isSetClassOperation||"animate"==n||S||(S="addClass"==n==a.hasClass(e)),S)return p(),v(),d(),m(),$;w=A.active||{},k=A.totalActive||0,"leave"==n&&a.one("$destroy",function(){var n=t.element(this),e=n.data(g);if(e){var a=e.active["ng-leave"];a&&(a.cancel(),N(n,"ng-leave"))}}),a.addClass(h),o&&o.tempClasses&&c(o.tempClasses,function(n){a.addClass(n)});var R=I++;return k++,w[e]=b,a.data(g,{last:b,active:w,index:R,totalActive:k}),v(),b.before(function(t){var i=a.data(g);t=t||!i||!i.active[e]||b.isClassBased&&i.active[e].event!=n,p(),t===!0?C():(d(),b.after(C))}),b.cancel}function R(n){var e=r(n);if(e){var a=t.isFunction(e.getElementsByClassName)?e.getElementsByClassName(h):e.querySelectorAll("."+h);c(a,function(n){n=t.element(n);var e=n.data(g);e&&e.active&&c(e.active,function(n){n.cancel()})})}}function N(n,t){if(u(n,b))$.disabled||($.running=!1,$.structural=!1);else if(t){var e=n.data(g)||{},a=t===!0;!a&&e.active&&e.active[t]&&(e.totalActive--,delete e.active[t]),(a||!e.totalActive)&&(n.removeClass(h),n.removeData(g))}}function O(n,e){if($.disabled)return!0;if(u(n,b))return $.running;var a,i,r;do{if(0===e.length)break;var s=u(e,b),o=s?$:e.data(g)||{};if(o.disabled)return!0;if(s&&(r=!0),a!==!1){var l=e.data(C);t.isDefined(l)&&(a=l)}i=i||o.running||o.last&&!o.last.isClassBased}while(e=e.parent());return!r||!a&&i}b.data(g,$);var T=D.$watch(function(){return w.totalPendingRequests},function(n){0===n&&(T(),D.$$postDigest(function(){D.$$postDigest(function(){$.running=!1})}))}),I=0,P=i.classNameFilter(),j=P?function(n){return P.test(n)}:function(){return!0};return{animate:function(n,t,e,a,i){return a=a||"ng-inline-animate",i=S(i)||{},i.from=e?t:null,i.to=e?e:t,x(function(t){return E("animate",a,o(n),null,null,l,i,t)})},enter:function(e,a,i,r){return r=S(r),e=t.element(e),a=s(a),i=s(i),k(e,!0),n.enter(e,a,i),x(function(n){return E("enter","ng-enter",o(e),a,i,l,r,n)})},leave:function(e,a){return a=S(a),e=t.element(e),R(e),k(e,!0),x(function(t){return E("leave","ng-leave",o(e),null,null,function(){n.leave(e)},a,t)})},move:function(e,a,i,r){return r=S(r),e=t.element(e),a=s(a),i=s(i),R(e),k(e,!0),n.move(e,a,i),x(function(n){return E("move","ng-move",o(e),a,i,l,r,n)})},addClass:function(n,t,e){return this.setClass(n,t,[],e)},removeClass:function(n,t,e){return this.setClass(n,[],t,e)},setClass:function(e,a,i,s){s=S(s);var u="$$animateClasses";if(e=t.element(e),e=o(e),k(e))return n.$$setClassImmediately(e,a,i,s);var l,f=e.data(u),d=!!f;return f||(f={},f.classes={}),l=f.classes,a=v(a)?a:a.split(" "),c(a,function(n){n&&n.length&&(l[n]=!0)}),i=v(i)?i:i.split(" "),c(i,function(n){n&&n.length&&(l[n]=!1)}),d?(s&&f.options&&(f.options=t.extend(f.options||{},s)),f.promise):(e.data(u,f={classes:l,options:s}),f.promise=x(function(t){var a=e.parent(),i=r(e),s=i.parentNode;if(!s||s.$$NG_REMOVED||i.$$NG_REMOVED)return void t();var o=e.data(u);e.removeData(u);var l=e.data(g)||{},c=B(e,o,l.active);return c?E("setClass",c,e,a,null,function(){c[0]&&n.$$addClassImmediately(e,c[0]),c[1]&&n.$$removeClassImmediately(e,c[1])},o.options,t):t()}))},cancel:function(n){n.$$cancelFn()},enabled:function(n,t){switch(arguments.length){case 2:if(n)N(t);else{var e=t.data(g)||{};e.disabled=!0,t.data(g,e)}break;case 1:$.disabled=!n;break;default:n=!$.disabled}return!!n}}}]),i.register("",["$window","$sniffer","$timeout","$$animateReflow",function(a,i,s,o){function u(){O||(O=o(function(){z=[],O=null,H={}}))}function f(n,t){O&&O(),z.push(t),O=o(function(){c(z,function(n){n()}),z=[],O=null,H={}})}function m(n,e){var a=r(n);n=t.element(a),Q.push(n);var i=Date.now()+e;L>=i||(s.cancel(J),L=i,J=s(function(){g(Q),Q=[]},e,!1))}function g(n){c(n,function(n){var t=n.data(W);t&&c(t.closeAnimationFns,function(n){n()})})}function C(n,t){var e=t?H[t]:null;if(!e){var i=0,r=0,s=0,o=0;c(n,function(n){if(n.nodeType==p){var t=a.getComputedStyle(n)||{},e=t[F+T];i=Math.max(h(e),i);var u=t[F+P];r=Math.max(h(u),r);{t[E+P]}o=Math.max(h(t[E+P]),o);var l=h(t[E+T]);l>0&&(l*=parseInt(t[E+j],10)||1),s=Math.max(l,s)}}),e={total:0,transitionDelay:r,transitionDuration:i,animationDelay:o,animationDuration:s},t&&(H[t]=e)}return e}function h(n){var t=0,e=d(n)?n.split(/\s*,\s*/):[];return c(e,function(n){t=Math.max(parseFloat(n)||0,t)}),t}function $(n){var t=n.parent(),e=t.data(K);return e||(t.data(K,++U),e=U),e+"-"+r(n).getAttribute("class")}function b(n,t,e,a){var i=["ng-enter","ng-leave","ng-move"].indexOf(e)>=0,s=$(t),o=s+" "+e,u=H[o]?++H[o].total:0,l={};if(u>0){var c=e+"-stagger",f=s+" "+c,v=!H[f];v&&t.addClass(c),l=C(t,f),v&&t.removeClass(c)}t.addClass(e);var d=t.data(W)||{},m=C(t,o),p=m.transitionDuration,g=m.animationDuration;if(i&&0===p&&0===g)return t.removeClass(e),!1;var h=a||i&&p>0,b=g>0&&l.animationDelay>0&&0===l.animationDuration,y=d.closeAnimationFns||[];t.data(W,{stagger:l,cacheKey:o,running:d.running||0,itemIndex:u,blockTransition:h,closeAnimationFns:y});var w=r(t);return h&&(D(w,!0),a&&t.css(a)),b&&A(w,!0),!0}function y(n,t,e,a,i){function o(){t.off(P,u),t.removeClass(v),t.removeClass(d),T&&s.cancel(T),S(t,e);var n=r(t);for(var a in g)n.style.removeProperty(g[a])}function u(n){n.stopPropagation();var t=n.originalEvent||n,e=t.$manualTimeStamp||t.timeStamp||Date.now(),i=parseFloat(t.elapsedTime.toFixed(_));Math.max(e-I,0)>=E&&i>=B&&a()}var l=r(t),f=t.data(W);if(-1==l.getAttribute("class").indexOf(e)||!f)return void a();var v="",d="";c(e.split(" "),function(n,t){var e=(t>0?" ":"")+n;v+=e+"-active",d+=e+"-pending"});var p="",g=[],h=f.itemIndex,$=f.stagger,b=0;if(h>0){var y=0;$.transitionDelay>0&&0===$.transitionDuration&&(y=$.transitionDelay*h);var w=0;$.animationDelay>0&&0===$.animationDuration&&(w=$.animationDelay*h,g.push(N+"animation-play-state")),b=Math.round(100*Math.max(y,w))/100}b||(t.addClass(v),f.blockTransition&&D(l,!1));var k=f.cacheKey+" "+v,x=C(t,k),B=Math.max(x.transitionDuration,x.animationDuration);if(0===B)return t.removeClass(v),S(t,e),void a();!b&&i&&(x.transitionDuration||(t.css("transition",x.animationDuration+"s linear all"),g.push("transition")),t.css(i));var F=Math.max(x.transitionDelay,x.animationDelay),E=F*V;if(g.length>0){var O=l.getAttribute("style")||"";";"!==O.charAt(O.length-1)&&(O+=";"),l.setAttribute("style",O+" "+p)}var T,I=Date.now(),P=R+" "+M,j=(F+B)*G,q=(b+j)*V;return b>0&&(t.addClass(d),T=s(function(){T=null,x.transitionDuration>0&&D(l,!1),x.animationDuration>0&&A(l,!1),t.addClass(v),t.removeClass(d),i&&(0===x.transitionDuration&&t.css("transition",x.animationDuration+"s linear all"),t.css(i),g.push("transition"))},b*V,!1)),t.on(P,u),f.closeAnimationFns.push(function(){o(),a()}),f.running++,m(t,q),o}function D(n,t){n.style[F+I]=t?"none":""}function A(n,t){n.style[E+q]=t?"paused":""}function w(n,t,e,a){return b(n,t,e,a)?function(n){n&&S(t,e)}:void 0}function k(n,t,e,a,i){return t.data(W)?y(n,t,e,a,i):(S(t,e),void a())}function x(n,t,e,a,i){var r=w(n,t,e,i.from);if(!r)return u(),void a();var s=r;return f(t,function(){s=k(n,t,e,a,i.to)}),function(n){(s||l)(n)}}function S(n,t){n.removeClass(t);var e=n.data(W);e&&(e.running&&e.running--,e.running&&0!==e.running||n.removeData(W))}function B(n,t){var e="";return n=v(n)?n:n.split(/\s+/),c(n,function(n,a){n&&n.length>0&&(e+=(a>0?" ":"")+n+t)}),e}var F,M,E,R,N="";n.ontransitionend===e&&n.onwebkittransitionend!==e?(N="-webkit-",F="WebkitTransition",M="webkitTransitionEnd transitionend"):(F="transition",M="transitionend"),n.onanimationend===e&&n.onwebkitanimationend!==e?(N="-webkit-",E="WebkitAnimation",R="webkitAnimationEnd animationend"):(E="animation",R="animationend");var O,T="Duration",I="Property",P="Delay",j="IterationCount",q="PlayState",K="$$ngAnimateKey",W="$$ngAnimateCSS3Data",_=3,G=1.5,V=1e3,H={},U=0,z=[],J=null,L=0,Q=[];return{animate:function(n,t,e,a,i,r){return r=r||{},r.from=e,r.to=a,x("animate",n,t,i,r)},enter:function(n,t,e){return e=e||{},x("enter",n,"ng-enter",t,e)},leave:function(n,t,e){return e=e||{},x("leave",n,"ng-leave",t,e)},move:function(n,t,e){return e=e||{},x("move",n,"ng-move",t,e)},beforeSetClass:function(n,t,e,a,i){i=i||{};var r=B(e,"-remove")+" "+B(t,"-add"),s=w("setClass",n,r,i.from);return s?(f(n,a),s):(u(),void a())},beforeAddClass:function(n,t,e,a){a=a||{};var i=w("addClass",n,B(t,"-add"),a.from);return i?(f(n,e),i):(u(),void e())},beforeRemoveClass:function(n,t,e,a){a=a||{};var i=w("removeClass",n,B(t,"-remove"),a.from);return i?(f(n,e),i):(u(),void e())},setClass:function(n,t,e,a,i){i=i||{},e=B(e,"-remove"),t=B(t,"-add");var r=e+" "+t;return k("setClass",n,r,a,i.to)},addClass:function(n,t,e,a){return a=a||{},k("addClass",n,B(t,"-add"),e,a.to)},removeClass:function(n,t,e,a){return a=a||{},k("removeClass",n,B(t,"-remove"),e,a.to)}}}])}])}(window,window.angular);