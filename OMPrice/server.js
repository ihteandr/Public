var express = require("express");
var config = require("./config/config.js");
var routes = require("./routes/main");
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var app;
cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();

});
if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        console.log("fork ", i);
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    app = express();

    config.install(app, express);
    routes.install(app);

    app.listen(config.port, function(){
        console.log("app listen port " + config.port);
    });
}

module.exports = app;