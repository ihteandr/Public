"use strict";angular.module("ngLocale",[],["$provide",function(e){var a={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["a.m.","p.m."],DAY:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],MONTH:["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],SHORTDAY:["søn.","man.","tir.","ons.","tor.","fre.","lør."],SHORTMONTH:["jan.","feb.","mar.","apr.","mai","jun.","jul.","aug.","sep.","okt.","nov.","des."],fullDate:"EEEE d. MMMM y",longDate:"d. MMMM y",medium:"d. MMM y HH.mm.ss",mediumDate:"d. MMM y",mediumTime:"HH.mm.ss","short":"dd.MM.yy HH.mm",shortDate:"dd.MM.yy",shortTime:"HH.mm"},NUMBER_FORMATS:{CURRENCY_SYM:"kr",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"nb-no",pluralCat:function(e){return 1==e?a.ONE:a.OTHER}})}]);