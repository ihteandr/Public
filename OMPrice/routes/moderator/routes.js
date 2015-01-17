var Market = require("../../database/models/market/model");
var Section = require("../../database/models/section/model");
var Category = require("../../database/models/category/model");
var Family = require("../../database/models/family/model");
var Country = require("../../database/models/country/model");
var Brand = require("../../database/models/brand/model");
var fs = require("fs");
var routes = {};

routes.get = {
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