"use strict";angular.module("ngLocale",[],["$provide",function(e){function r(e){e+="";var r=e.indexOf(".");return-1==r?0:e.length-r-1}function n(e,n){var a=n;void 0===a&&(a=Math.min(r(e),3));var M=Math.pow(10,a),m=(e*M|0)%M;return{v:a,f:m}}var a={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["Àárɔ̀","Ɔ̀sán"],DAY:["Ɔjɔ́ Àìkú","Ɔjɔ́ Ajé","Ɔjɔ́ Ìsɛ́gun","Ɔjɔ́rú","Ɔjɔ́bɔ","Ɔjɔ́ Ɛtì","Ɔjɔ́ Àbámɛ́ta"],MONTH:["Oshù Shɛ́rɛ́","Oshù Èrèlè","Oshù Ɛrɛ̀nà","Oshù Ìgbé","Oshù Ɛ̀bibi","Oshù Òkúdu","Oshù Agɛmɔ","Oshù Ògún","Oshù Owewe","Oshù Ɔ̀wàrà","Oshù Bélú","Oshù Ɔ̀pɛ̀"],SHORTDAY:["Àìkú","Ajé","Ìsɛ́gun","Ɔjɔ́rú","Ɔjɔ́bɔ","Ɛtì","Àbámɛ́ta"],SHORTMONTH:["Shɛ́rɛ́","Èrèlè","Ɛrɛ̀nà","Ìgbé","Ɛ̀bibi","Òkúdu","Agɛmɔ","Ògún","Owewe","Ɔ̀wàrà","Bélú","Ɔ̀pɛ̀"],fullDate:"EEEE, d MMMM y",longDate:"d MMMM y",medium:"d MMM y h:mm:ss a",mediumDate:"d MMM y",mediumTime:"h:mm:ss a","short":"dd/MM/y h:mm a",shortDate:"dd/MM/y",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"CFA",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"yo-bj",pluralCat:function(e,r){var M=0|e,m=n(e,r);return 1==M&&0==m.v?a.ONE:a.OTHER}})}]);