var CoffeeScript = require("coffee-script");
CoffeeScript.register();
var gulp = require("gulp"),
    path = require("path"),
    compile = require("gulp-compile-js"),
    concat = require("gulp-concat"),
    concatCss = require("gulp-concat-css"),
    less = require("gulp-less"),
    rjs = require("gulp-requirejs"),
	uglify = require("gulp-uglify"),
    imageMin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    clean = require("gulp-clean"),
    html_replace = require("gulp-html-replace"),
    replace = require("gulp-replace-task");

var paths = {
    moderator: {},
    manufacturer: {},
    website: {
        main: {}
    }
}

//------------------------------------- moderator client tasks --------------------------------------------
gulp.task("moderator-client:clean", function(){
    gulp.src("./public/moderator")
        .pipe(clean());
});

gulp.task('moderator-client:jsCompress', function() {
    paths.moderator.js = "js/built." + Date.now() + ".js";
    rjs({
        name: "main",
        baseUrl: './moderator-client/js',
        include: 'require.js',
        out: paths.moderator.js,
        paths: {
            jquery: 'libs/jquery/jquery-min',
            moment: 'libs/moment/lib',
            spin: 'libs/spin/lib',
            jcarousel: 'libs/jquery/jcarousel/lib',
            Lodash: 'libs/lodash/lodash.min',
            Bootstrap: 'libs/bootstrap/js/bootstrap',
            BootstrapGrowl: 'libs/bootstrap/js/bootstrap-growl.min',
            Angular: 'libs/angular/angular-main',
            templates: './../templates'
        },
        priority: [
            "jquery",
            "moment",
            "Lodash",
            "Angular"
        ],
        shim:{
            "Bootstrap":{
                deps:['jquery']
            },
            "BootstrapGrowl":{
                deps:['jquery']
            },
            "jcarousel":{
                deps: ['jquery']
            }
        },
        optimizeCss: 'standard',
        removeCombined: true,
        findNestedDependencies: true,
        optimizeAllPluginResources: true
    }).pipe(uglify()).pipe(gulp.dest('./public/moderator/'));
});

gulp.task("moderator-client:lessBuild", function(){
    paths.moderator.css = Date.now();
    gulp.src("./moderator-client/css/bootstrap/*.css")
        .pipe(gulp.dest("./public/moderator/css/bootstrap"));
    gulp.src("./moderator-client/css/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            compress: true
        }))
        .pipe(gulp.dest("./public/moderator/css/" + paths.moderator.css));
});

gulp.task("moderator-client:markup", function(){
    gulp.src("./moderator-client/templates/**/*.html")
        .pipe(gulp.dest("./public/moderator/templates"));
    gulp.src("./moderator-client/index.html")
        .pipe(replace({
            patterns: [{
                match: "js/built.js",
                replacement: paths.moderator.js
            },{
                match: "path",
                replacement: paths.moderator.css
            }]
        }))
        .pipe(gulp.dest("./public/moderator"));
});

gulp.task("moderator-client:imagesMin", function(){
    gulp.src('./moderator-client/img/**/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
//            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./public/moderator/img'));
});

gulp.task("moderator-client:fonts", function(){
    gulp.src("./moderator-client/fonts/*")
        .pipe(gulp.dest("./public/moderator/fonts"));
});

//------------------------ manufacturer client tasks --------------------------------------

gulp.task("manufacturer-client:clean", function(){
    gulp.src("./public/manufacturer")
        .pipe(clean());
});

gulp.task('manufacturer-client:jsCompress', function() {
    paths.manufacturer.js = "js/built." + Date.now() + ".js"
    rjs({
        name: "bootstrap",
        baseUrl: './manufacturer-client/js',
        include: 'require.js',
        out: paths.manufacturer.js,
        paths: {
            "Class": "libs/class",
            "BaseController": "base/BaseController",
            "BaseRouter": "base/BaseRouter",
            "EventDispatcher": "base/EventDispatcher",
            "BaseModel": "base/BaseModel",
            "jquery": "libs/jquery/jquery.min",
            "jcarousel": "libs/jquery/jcarousel/lib",
            "lodash": "libs/lodash/lodash.min",
            "Angular": "libs/angular/angular-main",
            "spin": "libs/spin/lib",
            "templates": "../templates",
            "Bootstrap": 'libs/bootstrap/js/bootstrap',
            "BootstrapGrowl": 'libs/bootstrap/js/bootstrap-growl.min'
        },
        shim:{
            "Bootstrap": {
                deps: ['jquery']
            },
            "BootstrapGrowl": {
                deps: ['Bootstrap', 'jquery']
            }
        },
        findNestedDependencies: true,
        optimizeAllPluginResources: true
    }).pipe(uglify()).pipe(gulp.dest('./public/manufacturer/'));
});

gulp.task("manufacturer-client:lessBuild", function(){
    paths.manufacturer.css = Date.now();
    gulp.src("./manufacturer-client/css/bootstrap/*.css")
        .pipe(gulp.dest("./public/manufacturer/css/bootstrap"));
    gulp.src("./manufacturer-client/css/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            compress: true
        }))
        .pipe(gulp.dest("./public/manufacturer/css/" + paths.manufacturer.css));
});

gulp.task("manufacturer-client:markup", function(){
    gulp.src("./manufacturer-client/templates/**/*.html")
        .pipe(gulp.dest("./public/manufacturer/templates"));
    gulp.src("./manufacturer-client/index.html")
        .pipe(replace({
            patterns: [{
                match: "js/built.js",
                replacement: paths.manufacturer.js
            },{
                match: "path",
                replacement: paths.manufacturer.css
            }]
        })).pipe(gulp.dest("./public/manufacturer"));
});

gulp.task("manufacturer-client:imagesMin", function(){
    gulp.src('./manufacturer-client/img/**/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
//            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./public/manufacturer/img'));
});

gulp.task("manufacturer-client:fonts", function(){
    gulp.src("./manufacturer-client/fonts/*")
        .pipe(gulp.dest("./public/manufacturer/fonts"));
});
// ----------------------------------- manufacturer register ------------------

gulp.task("manufacturer-register:clean", function(){
    gulp.src("./public/manufacturer-register")
        .pipe(clean());
});

gulp.task("manufacturer-register:jsCompress", function(){
    var basePth = "./manufacturer-register/js/";
    var files = [
        basePth + "libs/jquery-1.11.2.min.js",
        basePth + "libs/bootstrap.js",
        basePth + "libs/ripples.min.js",
        basePth + "libs/material.min.js",
        basePth + "script.coffee"
    ]
    gulp.src(files).
        pipe(compile({coffee:{bar:true}})).
        pipe(concat("all.js")).
        pipe(gulp.dest("./public/manufacturer-register/js/"));
});

gulp.task("manufacturer-register:cssCompress", function(){
    gulp.src("./manufacturer-register/css/**/*.css").
        pipe(concatCss("all.css")).
        pipe(gulp.dest("./public/manufacturer-register/css/"));
});

gulp.task("manufacturer-register:font", function(){
    gulp.src("./manufacturer-register/fonts/*")
        .pipe(gulp.dest("./public/manufacturer-register/css/fonts"));
});
// ----------------------------------- web site main --------------------------

gulp.task("website-main:clean", function(){
    gulp.src("./public/website/main-page")
        .pipe(clean());
});

gulp.task("website-main:jsCompress", function(){
    paths.website.main.js = "js/built." + Date.now() + ".js"
    rjs({
        name: "bootstrap",
        baseUrl: './website/main',
        include: 'libs/require.js',
        out: paths.website.main.js,
        paths: {
            backbone: 'libs/backbone/backbone',
            marionette: 'libs/marionette/marionette',
            underscore: 'libs/underscore/underscore',
            'cloud-router': 'libs/cloud-router/cloud-router',
            jquery: 'libs/jquery/jquery',
            tendina: 'libs/jquery/tendina',
            twit_bootstrap: 'libs/bootstrap/js/bootstrap',
            text: 'libs/text'
        },
        shim: {
            backbone: {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            },
            tendina: {
                deps: ['jquery']
            },
            underscore: {
                exports: '_'
            },
            jquery: {
                exports: '$'
            },
            marionette: {
                deps: ['backbone', 'underscore', 'jquery'],
                exports: 'Marionette'
            },
            twit_bootstrap: {
                deps: ['jquery']
            }
        },
        findNestedDependencies: true,
        optimizeAllPluginResources: true
    }).pipe(uglify()).pipe(gulp.dest('./public/website/main-page/'));
});

gulp.task("website-main:lessBuild", function(){
    paths.website.main.css = Date.now()
    gulp.src("./website/main/css/fonts/*")
        .pipe(gulp.dest("./public/website/main-page/css/fonts"));
    gulp.src("./website/main/css/bootstrap/*.css")
        .pipe(gulp.dest("./public/website/main-page/css/bootstrap"));
    gulp.src("./website/main/css/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            compress: true
        }))
        .pipe(gulp.dest("./public/website/main-page/css/" + paths.website.main.css));
});

gulp.task("website-main:markup", function(){
    gulp.src("./website/main/**/*.html")
        .pipe(replace({
            patterns: [{
                match: "js/built.js",
                replacement: paths.website.main.js
            },{
                match: "path",
                replacement: paths.website.main.css
            }]
        }))
        .pipe(gulp.dest("./public/website/main-page"));
});

gulp.task("website-main:imagesMin", function(){
    gulp.src('./website/main/img/**/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
//            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./public/website/main-page/img'));
    gulp.src('./website/main/css/img/**/*')
            .pipe(imageMin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
    //            use: [pngcrush()]
            }))
            .pipe(gulp.dest('./public/website/main-page/css/img'));
});

gulp.task("watch", function(){
    //-------------------- manufacturer client tasks watchers ----------------------------------
    gulp.watch("./manufacturer-client/css/**/*.less", ["manufacturer-client:lessBuild"]);
    gulp.watch("./manufacturer-client/**/*.js", ["manufacturer-client:jsCompress"]);
    gulp.watch("./manufacturer-client/templates/**/*.html", ["manufacturer-client:markup"]);
    gulp.watch('./manufacturer-client/img/*', ["manufacturer-client:imagesMin"]);

    //-------------------- moderator client tasks watchers ----------------------------------
    gulp.watch("./moderator-client/css/**/*.less", ["moderator-client:lessBuild"]);
    gulp.watch("./moderator-client/**/*.js", ["moderator-client:jsCompress"]);
    gulp.watch("./moderator-client/templates/**/*.html", ["moderator-client:markup"]);
    gulp.watch('./moderator-client/img/*', ["moderator-client:imagesMin"]);
});

gulp.task("manufacturer-client", [
    "manufacturer-client:lessBuild",
    "manufacturer-client:jsCompress",
    "manufacturer-client:markup",
    "manufacturer-client:fonts"
]);

gulp.task("manufacturer-client:all", [
    "manufacturer-client",
    "manufacturer-client:imagesMin",
]);

gulp.task("moderator-client", [
    "moderator-client:lessBuild",
    "moderator-client:jsCompress",
    "moderator-client:markup",
    "moderator-client:fonts"
]);
gulp.task("moderator-client:all", [
    "moderator-client",
    "moderator-client:imagesMin"
]);

gulp.task("website-main", [
    "website-main:lessBuild",
    "website-main:jsCompress",
    "website-main:markup"
]);

gulp.task("website-main:all", [
    "website-main",
    "website-main:imagesMin"
]);

gulp.task("manufacturer-register", [
    "manufacturer-register:jsCompress",
    "manufacturer-register:cssCompress",
    "manufacturer-register:font"
]);

gulp.task("all", [
    "moderator-client:all",
    "manufacturer-client:all",
    "website-main:all",
    "manufacturer-register"
]);
gulp.task("default", []);