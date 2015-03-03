var express = require("express");
var config = require("./config/config.js");
var routes = require("./routes/main");
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var app;

if (cluster.isMaster) {
    // Fork workers.
    var db_installer = require("./database/installer");
    db_installer.install();


    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.id + ' died');
        cluster.fork();
    });
} else {
    app = express();
    // Workers can share any TCP connection
    // In this case its a HTTP server
    config.install(app, express);
    routes.install(app);

    app.listen(config.port, function(){
        console.log("app listen port " + config.port);
    });
}

module.exports = app;