var tradesman_router = require('./tradesman_routing/router');
var messages_router = require('./messages_routing/router');
var products_router = require('./products_routing/router');
var users_router = require('./users_routing/router');

exports.install = function(app){
    /*
    app.on('MethodNotAllowed', function unknownMethodHandler(req, res, next) {
            if (req.method.toLowerCase() === 'options') {
                console.log('received an options method request');
                var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With']; // added Origin & X-Requested-With

                if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

                res.header('Access-Control-Allow-Credentials', true);
                res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
                res.header('Access-Control-Allow-Methods', res.methods.join(', '));
                res.header('Access-Control-Allow-Origin', req.headers.origin);
                res.send(204)
                return next();
            } else {
                res.send(404)
                return next();
            }
        }
    );*/
    app.opts( '.*', function(req, res, next) {
        if(req.headers.origin && req.headers['access-control-request-method']){
            res.header('Access-Control-Allow-Origin', req.headers.origin)
            res.header('Access-Control-Allow-Credentials', 'true')
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id')
            res.header('Access-Control-Expose-Headers', 'Set-Cookie')
            res.header('Allow', req.headers['access-control-request-method'])
            res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'])
            req.log.info({ url:req.url, method:req.headers['access-control-request-method'] }, "Preflight")
            res.send(204)
            next()
        }else{
            res.send(404)
            next()
        }
    })
    tradesman_router.install(app);
    messages_router.install(app);
    products_router.install(app);
    users_router.install(app);
}