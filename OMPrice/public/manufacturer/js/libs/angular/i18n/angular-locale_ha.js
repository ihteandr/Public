"use strict";angular.module("ngLocale",[],["$provide",function(a){function i(a){a+="";var i=a.indexOf(".");return-1==i?0:a.length-i-1}function r(a,r){var e=r;void 0===e&&(e=Math.min(i(a),3));var u=Math.pow(10,e),n=(a*u|0)%u;return{v:e,f:n}}var e={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Lahadi","Litinin","Talata","Laraba","Alhamis","Jumma'a","Asabar"],MONTH:["Janairu","Faburairu","Maris","Afirilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktoba","Nuwamba","Disamba"],SHORTDAY:["Lh","Li","Ta","Lr","Al","Ju","As"],SHORTMONTH:["Jan","Fab","Mar","Afi","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis"],fullDate:"EEEE, d MMMM, y",longDate:"d MMMM, y",medium:"d MMM, y HH:mm:ss",mediumDate:"d MMM, y",mediumTime:"HH:mm:ss","short":"d/M/yy HH:mm",shortDate:"d/M/yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"₦",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"ha",pluralCat:function(a,i){var u=0|a,n=r(a,i);return 1==u&&0==n.v?e.ONE:e.OTHER}})}]);