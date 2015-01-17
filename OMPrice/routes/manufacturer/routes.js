var routes = {};

routes.get = {
    "/manufacturer/login":  function(req, res){
        res.redirect("/login");
    },
    "/manufacturer/checkAuthorization": function(req, res){
        res.redirect("/checkAuthorization");
    }
};

routes.post = {};

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