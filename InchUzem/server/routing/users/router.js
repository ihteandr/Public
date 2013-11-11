var Tiny = require("tiny");
var _ = require("underscore");
var Settings = require("settings/settings");
var restify = require("restify");
var rest_client = restify.createJsonClient({
    url: Settings.API_URI
});
var utils = require("utils/utils");

var router = {

}

router.get = {
    '/users/:id': function(req, res, next){
        var id = req.params.id;
        utils.answer("db/users.tiny", "/users/" + id, id)
    }
}

router.post = {
    '/users/login': function(req, res, next){
        var login = req.param("login");
        var password = req.param("password");
        rest_client.get("/users", {login: login, password: password}, function(err, r_req, r_res, obj){
            console.log("error : ", err);
            console.log("obj : ", obj);
            if(err){
                res.send({error : err}, 500);
                res.end();
                return;
            }
            if(obj && obj.name){
                delete obj.password;
                res.send(obj, 200);
                res.end();
                utils.save_user_state(obj, "last_login");
                return;
            }
            res.send({error: "Invalid login or password"}, 200);
        });
    },
    '/users/register': function(req, res, next){
        var user = req.params;
        rest_client.get("/users", {login: user.login}, function(err, r_req, r_res, obj){
            console.log("error : ", err);
            console.log("obj : ", obj);
            if(err){
                res.send({error : err}, 500);
                res.end();
                return;
            }
            if(obj && obj.name){
                res.send({error: "User with this login already have."}, 200);
                res.end();
                return;
            }
            rest_client.post("/users", user, function(err, r_req, r_res, obj){
                if(err){
                    console.log("error with registering user : ", err);
                    res.send({error: err}, 500);
                    res.end();
                    return;
                }
                utils.save_user_state(obj, "registered");
                res.send({}, 200);
                res.end();
            })
        });
    },
    '/users/logout': function(req, res, next){
        var user = req.params;
        utils.save_user_state(user, "logout");
        utils.set_offline(req.headers["user"]);
        res.send({}, 200);
        res.end()
    }
}

router.put = {
    '/users/:id': function(req, res, next){
        var user = req.body;
        var id = req.params.id;
        console.log("user : ", user);
        console.log("id : ", req.param("id"));
        rest_client.put("/users/" + id, user, function(err, r_req, r_res, obj){
            console.log("error : ", err);
            console.log("obj : ", obj);
            if(err){
                res.send({error : err}, 500);
                res.end();
                return;
            }
            if(obj && obj.name){
                res.send(obj, 200);
                res.end();
                utils.save_user_state(obj, "updated");
                return;
            }
            res.send({error: "Unknown Error"}, 200);
            res.end();
        });
    },
    '/users/:id/products': function(req, res, next){
        var products = req.param("products");
        var user_id = req.param("id");
        Tiny("db/users.tiny", function(err, db){
            if(err){
                console.log("error with open users db : ", err);
                res.send({error: "Internal Server Error"}, 500);
                res.end();
                return;
            }
            db.get(user_id, function(err, user){
                if(err){
                    console.log("error with get user by id : ", err);
                    res.send({error: "Internal Server error"}, 500);
                    res.end();
                    return;
                }
                user.products = user.products || [];
                user.products = _.union(user.products, products);
                db.update(user.login, user, function(err, user){
                    if(err){
                            console.log("error with update user : ", err);
                            res.send({error: "Internal Server error"}, 500);
                            res.end();
                            return;
                    }
                    res.send(user, 200);
                    res.end()
                })
            })
        })
    }
}

router.del = {
    '/users/:id': function(req, res, next){
        var id = req.params.id;
        rest_client.del("/users/"+id, function(err, r_req, r_res, obj){
            if(err){
                res.send({error: err}, 500);
                res.end();
                return;
            }
            Tiny("db/users.tiny", function(err, db){
                if(err){
                    console.log("error with open users db : ", err);
                    res.send({error: err}, 500);
                    res.end();
                    return;
                }
                db.remove(id, function(err){
                    if(err){
                        console.log("error with remove user from db : ", err);
                        res.send({error: err}, 500);
                        res.end();
                        return;
                    }
                    res.send({}, 200);
                    res.end();
                })
            })
        })
    }
}

exports.install = function(app){
    for(var method in router){
        for(var route in router[method]){
            app[method](route, router[method][route]);
        }
    }
}