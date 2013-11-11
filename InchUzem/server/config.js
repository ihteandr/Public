var utils = require("utils/utils")
exports.install = function(app, express){
    app.use(express.static(__dirname + '/public/version_1.0'));
    app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(function(req, res, next){
        var ua = req.headers['user'];
        utils.set_online(ua);
        next();
    });
    app.use(function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    });
    app.use(function clientErrorHandler(err, req, res, next) {
        if (req.xhr) {
            res.send(500, { error: 'Something blew up!' });
        } else {
            next(err);
        }
    });
    app.use(function errorHandler(err, req, res, next) {
        res.status(500);
        res.render('error', { error: err });
    });

    require("./routing/router").install(app);
}