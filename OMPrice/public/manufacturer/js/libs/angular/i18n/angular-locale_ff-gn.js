"use strict";angular.module("ngLocale",[],["$provide",function(e){function a(e){e+="";var a=e.indexOf(".");return-1==a?0:e.length-a-1}function o(e,o){var r=o;void 0===r&&(r=Math.min(a(e),3));var n=Math.pow(10,r),i=(e*n|0)%n;return{v:r,f:i}}var r={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["subaka","kikiiɗe"],DAY:["dewo","aaɓnde","mawbaare","njeslaare","naasaande","mawnde","hoore-biir"],MONTH:["siilo","colte","mbooy","seeɗto","duujal","korse","morso","juko","siilto","yarkomaa","jolal","bowte"],SHORTDAY:["dew","aaɓ","maw","nje","naa","mwd","hbi"],SHORTMONTH:["sii","col","mbo","see","duu","kor","mor","juk","slt","yar","jol","bow"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM, y HH:mm:ss",mediumDate:"d MMM, y",mediumTime:"HH:mm:ss","short":"d/M/y HH:mm",shortDate:"d/M/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"FG",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"ff-gn",pluralCat:function(e,a){var n=0|e,i=o(e,a);return 1==n&&0==i.v?r.ONE:r.OTHER}})}]);