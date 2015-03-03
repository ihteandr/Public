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
        res.status(200).json({status: "fail", error: new Error("You are not a Authorized")});
    },
    "/login": function(req, res, next){
        var data = {
            login: req.param("login"),
            password: req.param("password")
        };
        console.log("data ", data);
        User.findOne().or([{username: data.login}, { email: data.login }]).exec(function(err, user){
            console.log(arguments);
            if(err) return next(err);
            if(user){
                if(user.checkPassword(data.password)){
                    var userData =  {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username
                    };
                    res.status(200).json({
                        status: "success",
                        data: userData
                    }).end();
                } else {
                    return res.status(200).json({
                        status: "fail",
                        error: {message:"Username or password is wrong!"}
                    }).end();
                }
            } else {
                return res.status(200).json({
                    status: "fail",
                    error: {message: "Username or password is wrong!"}
                }).end();
            }
        });
    },
    "/logout": function(req, res){
        req.session.destroy();
        res.status(200).json({status: "success"}).end();
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
        var basketRoutes = require("../routes/basket/routes");
        var shopRoutes = require("../routes/shop/routes");
        var utilsRoutes = require("../routes/utils/routes");
        var userRoutes = require("../routes/user/routes");
        parserRoutes.install(app);
        productRoutes.install(app);
        moderatorRoutes.install(app);
        manufacturerRoutes.install(app);
        basketRoutes.install(app);
        shopRoutes.install(app);
        utilsRoutes.install(app);
        userRoutes.install(app);
    }
};