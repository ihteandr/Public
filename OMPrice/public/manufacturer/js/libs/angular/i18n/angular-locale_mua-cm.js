"use strict";angular.module("ngLocale",[],["$provide",function(i){function a(i){i+="";var a=i.indexOf(".");return-1==a?0:i.length-a-1}function e(i,e){var M=e;void 0===M&&(M=Math.min(a(i),3));var m=Math.pow(10,M),o=(i*m|0)%m;return{v:M,f:o}}var M={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};i.value("$locale",{DATETIME_FORMATS:{AMPMS:["comme","lilli"],DAY:["Com'yakke","Comlaaɗii","Comzyiiɗii","Comkolle","Comkaldǝɓlii","Comgaisuu","Comzyeɓsuu"],MONTH:["Fĩi Loo","Cokcwaklaŋne","Cokcwaklii","Fĩi Marfoo","Madǝǝuutǝbijaŋ","Mamǝŋgwãafahbii","Mamǝŋgwãalii","Madǝmbii","Fĩi Dǝɓlii","Fĩi Mundaŋ","Fĩi Gwahlle","Fĩi Yuru"],SHORTDAY:["Cya","Cla","Czi","Cko","Cka","Cga","Cze"],SHORTMONTH:["FLO","CLA","CKI","FMF","MAD","MBI","MLI","MAM","FDE","FMU","FGW","FYU"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM y HH:mm:ss",mediumDate:"d MMM y",mediumTime:"HH:mm:ss","short":"d/M/y HH:mm",shortDate:"d/M/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"FCFA",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"mua-cm",pluralCat:function(i,a){var m=0|i,o=e(i,a);return 1==m&&0==o.v?M.ONE:M.OTHER}})}]);