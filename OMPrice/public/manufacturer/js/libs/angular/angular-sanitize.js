!function(e,t){"use strict";function r(){this.$get=["$$sanitizeUri",function(e){return function(t){var r=[];return s(t,c(r,function(t,r){return!/^unsafe/.test(e(t,r))})),r.join("")}}]}function n(e){var r=[],n=c(r,t.noop);return n.chars(e),r.join("")}function a(e){var t,r={},n=e.split(",");for(t=0;t<n.length;t++)r[n[t]]=!0;return r}function s(e,r){function n(e,n,s,o){if(n=t.lowercase(n),k[n])for(;w.last()&&C[w.last()];)a("",w.last());y[n]&&w.last()==n&&a("",n),o=x[n]||!!o,o||w.push(n);var c={};s.replace(f,function(e,t,r,n,a){var s=r||n||a||"";c[t]=i(s)}),r.start&&r.start(n,c,o)}function a(e,n){var a,s=0;if(n=t.lowercase(n))for(s=w.length-1;s>=0&&w[s]!=n;s--);if(s>=0){for(a=w.length-1;a>=s;a--)r.end&&r.end(w[a]);w.length=s}}"string"!=typeof e&&(e=null===e||"undefined"==typeof e?"":""+e);var s,o,c,v,w=[],$=e;for(w.last=function(){return w[w.length-1]};e;){if(v="",o=!0,w.last()&&A[w.last()]?(e=e.replace(new RegExp("(.*)<\\s*\\/\\s*"+w.last()+"[^>]*>","i"),function(e,t){return t=t.replace(d,"$1").replace(m,"$1"),r.chars&&r.chars(i(t)),""}),a("",w.last())):(0===e.indexOf("<!--")?(s=e.indexOf("--",4),s>=0&&e.lastIndexOf("-->",s)===s&&(r.comment&&r.comment(e.substring(4,s)),e=e.substring(s+3),o=!1)):b.test(e)?(c=e.match(b),c&&(e=e.replace(c[0],""),o=!1)):g.test(e)?(c=e.match(p),c&&(e=e.substring(c[0].length),c[0].replace(p,a),o=!1)):h.test(e)&&(c=e.match(u),c?(c[4]&&(e=e.substring(c[0].length),c[0].replace(u,n)),o=!1):(v+="<",e=e.substring(1))),o&&(s=e.indexOf("<"),v+=0>s?e:e.substring(0,s),e=0>s?"":e.substring(s),r.chars&&r.chars(i(v)))),e==$)throw l("badparse","The sanitizer was unable to parse the following block of html: {0}",e);$=e}a()}function i(e){if(!e)return"";var t=T.exec(e),r=t[1],n=t[3],a=t[2];return a&&(O.innerHTML=a.replace(/</g,"&lt;"),a="textContent"in O?O.textContent:O.innerText),r+a+n}function o(e){return e.replace(/&/g,"&amp;").replace(v,function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1);return"&#"+(1024*(t-55296)+(r-56320)+65536)+";"}).replace(w,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function c(e,r){var n=!1,a=t.bind(e,e.push);return{start:function(e,s,i){e=t.lowercase(e),!n&&A[e]&&(n=e),n||D[e]!==!0||(a("<"),a(e),t.forEach(s,function(n,s){var i=t.lowercase(s),c="img"===e&&"src"===i||"background"===i;F[i]!==!0||E[i]===!0&&!r(n,c)||(a(" "),a(s),a('="'),a(o(n)),a('"'))}),a(i?"/>":">"))},end:function(e){e=t.lowercase(e),n||D[e]!==!0||(a("</"),a(e),a(">")),e==n&&(n=!1)},chars:function(e){n||a(o(e))}}}var l=t.$$minErr("$sanitize"),u=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,p=/^<\/\s*([\w:-]+)[^>]*>/,f=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,h=/^</,g=/^<\//,d=/<!--(.*?)-->/g,b=/<!DOCTYPE([^>]*?)>/i,m=/<!\[CDATA\[(.*?)]]>/g,v=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,w=/([^\#-~| |!])/g,x=a("area,br,col,hr,img,wbr"),$=a("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),z=a("rp,rt"),y=t.extend({},z,$),k=t.extend({},$,a("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),C=t.extend({},z,a("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),A=a("script,style"),D=t.extend({},x,k,C,y),E=a("background,cite,href,longdesc,src,usemap"),F=t.extend({},E,a("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),O=document.createElement("pre"),T=/^(\s*)([\s\S]*?)(\s*)$/;t.module("ngSanitize",[]).provider("$sanitize",r),t.module("ngSanitize").filter("linky",["$sanitize",function(e){var r=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,a=/^mailto:/;return function(s,i){function o(e){e&&h.push(n(e))}function c(e,r){h.push("<a "),t.isDefined(i)&&(h.push('target="'),h.push(i),h.push('" ')),h.push('href="'),h.push(e),h.push('">'),o(r),h.push("</a>")}if(!s)return s;for(var l,u,p,f=s,h=[];l=f.match(r);)u=l[0],l[2]==l[3]&&(u="mailto:"+u),p=l.index,o(f.substr(0,p)),c(u,l[0].replace(a,"")),f=f.substring(p+l[0].length);return o(f),e(h.join(""))}}])}(window,window.angular);