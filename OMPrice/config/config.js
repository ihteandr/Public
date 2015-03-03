module.exports = {
    install: function(app, express){
        var mongoose = require('mongoose');
        mongoose.connect(this.db_url);
        var _ = require("lodash");
        var bodyParser = require('body-parser');
        var multer = require('multer');
        var methodOverride = require('method-override');

        app.set('view engine', 'jade');
        app.use(multer({
            dest: './uploads/',
            rename: function (fieldname, filename) {
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
            }
        }));
        app.use(bodyParser());
        app.use(methodOverride());

        app.use("/", express.static(__dirname +'/../public/website/main-page'));
        app.use("/manufacturer", express.static(__dirname +'/../public/manufacturer'));
        app.use("/manufacturer/register", express.static(__dirname +'/../public/manufacturer-register'));
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

        var User = require("../database/models/user/model");
        app.use(function(req, res, next){
            var availablePaths = [
                "/login",
                "/logout",
                "/checkAuthorization",
                "/user",
                "/manufacturer/register"
                ];
            if(_.contains(availablePaths, req.path) || req.originalMethod.toLowerCase() == 'get'){
                next();
            } else {
                User.findOne({_id: req.param("user")}).exec(function(err, user){
                    if(user){
                        req.user = user;
                        next();
                    }else{
                        res.status(401).send({status: "fail", error: {message: "You are not authorized"}});
                    }
                });
            }
        });
    },
    port: 3000,
    db_url: "mongodb://localhost/test"
};