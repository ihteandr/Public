var User = require("../database/models/user/model");
var FS = require("fs");

var routes = {
    "use": {
        "/": function(req, res, next){
            next();
        }
    }
};
routes.get = {
};
routes.post = {
    "/checkAuthorization": function(req, res, next){
        if(req.session.user){
            res.status(200).json({status:"success", data: req.session.user});
        } else {
            res.status(200).json({status: "fail", error: new Error("You are not a Authorized")});
        }
    },
    "/login": function(req, res, next){
        var data = {
            username: req.param("username"),
            password: req.param("password")
        };
        User.findOne({username: data.username}, function(err, user){
            if(err){
                console.error("Problem with find user by username ", err);
                next(err);
            } else {
                if(user){
                    if(user.checkPassword(data.password)){
                        var userData = {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        };
                        req.session.auth = true;
                        req.session.user = userData;
                        req.session.permissions = user.permissions;
                        res.status(200).json({
                            status: "success",
                            data: data
                        });
                    } else {
                        res.status(200).json({
                            status: "fail",
                            error: new Error("Username or password is wrong!")
                        });
                    }
                } else {
                    res.status(200).json({
                        status: "fail",
                        error: new Error("Username or password is wrong!")
                    });
                }
            }
        });
    },
    "/logout": function(req, res){
        req.session.destroy();
        res.status(200).json({status: "success"});
    }
};

module.exports = {
    install: function(app){
        for(var method in routes){
            for(var path in routes[method]){
                app[method](path, routes[method][path]);
            }
        }
        var parserRoutes = require("../routes/parse/routes");
        var productRoutes = require("../routes/product/routes");
        var moderatorRoutes = require("../routes/moderator/routes");
        var manufacturerRoutes = require("../routes/manufacturer/routes");
        var utilsRoutes = require("../routes/utils/routes");
        parserRoutes.install(app);
        productRoutes.install(app);
        moderatorRoutes.install(app);
        manufacturerRoutes.install(app);
        utilsRoutes.install(app);
    }
};