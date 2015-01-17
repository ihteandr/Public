module.exports = {
    install: function(app, express){
        var db_installer = require("../database/installer");
        db_installer.install();

        var _ = require("lodash");
        var bodyParser = require('body-parser');
        var multer = require('multer');
        var methodOverride = require('method-override');
        var cookieParser = require("cookie-parser");
        var session = require("express-session");

        app.use(multer({
            dest: './uploads/',
            rename: function (fieldname, filename) {
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
            }
        }));
        app.use(bodyParser());
        app.use(methodOverride());
        app.use(cookieParser('S3CRE7'));
        var hour = 24*60*60*1000;
        app.use(session({
            cookie: {
                maxAge: hour
            }
        }));

        app.use("/", express.static(__dirname +'/../public/website/main-page'));
        app.use("/manufacturer", express.static(__dirname +'/../public/manufacturer'));
        app.use("/moderator", express.static(__dirname +'/../public/moderator'));
        app.use(express.static(__dirname +'/../public'));

        //todo comment after test
//        app.use(function(req, res, next){
//            req.session.permissoins = 2;
//            next();
//        });

        app.use(function(err, req, res, next){
            console.error(err.stack);
            res.status(500).json({status: "fail", error: err});
        });

        app.use(function(req, res, next){
            var availablePaths = [
                "/login",
                "/checkAuthorization"
                ];
            if(req.session.auth || _.contains(availablePaths, req.path) || req.originalMethod == 'GET'){
                next();
            } else {
                res.status(401).send({status: "fail", error: {message: "You are not authorized"}});
            }
        });
    },
    port: 3000,
    db_url: "mongodb://localhost/test"
};