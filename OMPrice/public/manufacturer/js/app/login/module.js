define(["Angular","./LoginController","./LoginService","./LoginModel","./directives/directives"],function(e,i,o,r,n){var l=e.module("login",[]);return l.service("LoginService",o),l.provider("LoginModel",r),l.controller("loginController",i),n.initialize(),l});