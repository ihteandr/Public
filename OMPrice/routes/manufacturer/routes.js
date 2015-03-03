var User = require("../../database/models/user/model");
var routes = {};

routes.get = {
    "/manufacturer/login":  function(req, res){
        res.redirect("/login");
    },
    "/manufacturer/checkAuthorization": function(req, res){
        res.redirect("/checkAuthorization");
    },
    "/manufacturer/register": function(req, res){
        return res.render("manufacturer-register");
    }
};

routes.post = {
    "/manufacturer/register": function(req, res){
        var password = req.param("password");
        var data = {
            name: req.param("name"),
            company: req.param("company"),
            username: req.param("username"),
            email: req.param("email")
        };

        User.findOne().or([{username: data.username}, {email: data.email}]).exec(function(err, user){
            if(!user){
                user = new User(data);
                user.hashedPassword = user.encrypt(password);
                user.save(function(err){
                    if(err){
                        next(err);
                    } else {
                        return res.status(200).send({status: "success"}).end();
                    }
                });
            } else {
                res.status(200).send({status: "error", error: {message: "В системе уже есть пользователь с таким логином или электронной почтой, " +
                    "пожалуйста пройдите назад и зарегестрируйтесь под другим логином или электронной почтой"}});
            }
        });
    }
};

routes.put = {};

module.exports = {
    install: function(app){
        for(var method in routes){
            for(var path in routes[method]){
                app[method](path, routes[method][path]);
            }
        }
    }
};