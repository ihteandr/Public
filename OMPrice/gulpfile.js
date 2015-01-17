var gulp = require("gulp"),
    less = require("gulp-less"),
	path = require("path"),
    rj = require("gulp-requirejs"),
	uglify = require("gulp-uglify"),
    imageMin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    clean = require("gulp-clean");

//------------------------------------- moderator client tasks --------------------------------------------
gulp.task("moderator-client:clean", function(){
    gulp.src("./public/moderator")
        .pipe(clean());
});

gulp.task('moderator-client:jsCompress', function() {
    gulp.src('./moderator-client/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/moderator/'))
});

gulp.task("moderator-client:lessBuild", function(){
    gulp.src("./moderator-client/css/bootstrap/*.css")
        .pipe(gulp.dest("./public/moderator/css/bootstrap"));
    gulp.src("./moderator-client/css/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            compress: true
        }))
        .pipe(gulp.dest("./public/moderator/css"));
});

gulp.task("moderator-client:markup", function(){
    gulp.src("./moderator-client/templates/**/*.html")
        .pipe(gulp.dest("./public/moderator/templates"));
    gulp.src("./moderator-client/index.html")
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
    gulp.src('./manufacturer-client/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/manufacturer/'))
});

gulp.task("manufacturer-client:lessBuild", function(){
    gulp.src("./manufacturer-client/css/bootstrap/*.css")
        .pipe(gulp.dest("./public/manufacturer/css/bootstrap"));
    gulp.src("./manufacturer-client/css/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            compress: true
        }))
        .pipe(gulp.dest("./public/manufacturer/css"));
});

gulp.task("manufacturer-client:markup", function(){
    gulp.src("./manufacturer-client/templates/**/*.html")
        .pipe(gulp.dest("./public/manufacturer/templates"));
    gulp.src("./manufacturer-client/index.html")
        .pipe(gulp.dest("./public/manufacturer"));
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

// ----------------------------------- web site main --------------------------

gulp.task("website-main:clean", function(){
    gulp.src("./public/website/main-page")
        .pipe(clean());
});

gulp.task("website-main:jsCompress", function(){
    gulp.src('./website/main/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/website/main-page/'))
});

gulp.task("website-main:lessBuild", function(){
    gulp.src("./website/main/css/fonts/*")
        .pipe(gulp.dest("./public/website/main-page/css/fonts"));
    gulp.src("./website/main/css/bootstrap/*.css")
        .pipe(gulp.dest("./public/website/main-page/css/bootstrap"));
    gulp.src("./website/main/css/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")],
            compress: true
        }))
        .pipe(gulp.dest("./public/website/main-page/css"));
});

gulp.task("website-main:markup", function(){
    gulp.src("./website/main/**/*.html")
        .pipe(gulp.dest("./public/website/main-page"));
});

gulp.task("website-main:imagesMin", function(){
    gulp.src('./website.main/img/**/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
//            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./public/website/main-page/img'));
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

gulp.task("all", [
    "moderator-client:all",
    "manufacturer-client:all",
    "website-main:all"
]);
gulp.task("default", []);