"use strict";angular.module("ngLocale",[],["$provide",function(e){function M(e){e+="";var M=e.indexOf(".");return-1==M?0:e.length-M-1}function n(e,n){var r=n;void 0===r&&(r=Math.min(M(e),3));var a=Math.pow(10,r),m=(e*a|0)%a;return{v:r,f:m}}var r={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["ӕмбисбоны размӕ","ӕмбисбоны фӕстӕ"],DAY:["хуыцаубон","къуырисӕр","дыццӕг","ӕртыццӕг","цыппӕрӕм","майрӕмбон","сабат"],MONTH:["январы","февралы","мартъийы","апрелы","майы","июны","июлы","августы","сентябры","октябры","ноябры","декабры"],SHORTDAY:["хцб","крс","дцг","ӕрт","цпр","мрб","сбт"],SHORTMONTH:["янв.","фев.","мар.","апр.","мая","июны","июлы","авг.","сен.","окт.","ноя.","дек."],fullDate:"EEEE, d MMMM, y 'аз'",longDate:"d MMMM, y 'аз'",medium:"dd MMM y 'аз' HH:mm:ss",mediumDate:"dd MMM y 'аз'",mediumTime:"HH:mm:ss","short":"dd.MM.yy HH:mm",shortDate:"dd.MM.yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"GEL",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"os-ge",pluralCat:function(e,M){var a=0|e,m=n(e,M);return 1==a&&0==m.v?r.ONE:r.OTHER}})}]);