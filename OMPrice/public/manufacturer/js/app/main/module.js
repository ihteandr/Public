define(["Angular","./header/HeaderController","./pages/product-info/module","./pages/home/module"],function(e,o){var r=e.module("main",["productInfo","home"]);return r.controller("headerController",o),r});