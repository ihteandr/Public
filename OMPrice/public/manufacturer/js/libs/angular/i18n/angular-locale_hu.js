"use strict";angular.module("ngLocale",[],["$provide",function(e){var r={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["de.","du."],DAY:["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],MONTH:["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],SHORTDAY:["V","H","K","Sze","Cs","P","Szo"],SHORTMONTH:["jan.","febr.","márc.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec."],fullDate:"y. MMMM d., EEEE",longDate:"y. MMMM d.",medium:"y. MMM d. H:mm:ss",mediumDate:"y. MMM d.",mediumTime:"H:mm:ss","short":"y. MM. dd. H:mm",shortDate:"y. MM. dd.",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"Ft",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"hu",pluralCat:function(e){return 1==e?r.ONE:r.OTHER}})}]);