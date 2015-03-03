module.exports = {
    install: function(){
        var mongoose = require('mongoose');
        var config = require("../config/config");
        mongoose.connect(config.db_url);
        //install models
        require("./models/market/model");
        require("./models/shop/model");
        require("./models/section/model");
        require("./models/category/model");
        require("./models/family/model");
        require("./models/nutritional/model");
        require("./models/details/model");
        require("./models/productPrice/model");
        require("./models/product/model");
        require("./models/basket/model");
        var User = require("./models/user/model");


        var defaultUser = {
            username: "maksim",
            name: "Maksim",
            email: "test@mail.com",
            permissions: 2
        };
        User.findOne({username: defaultUser.username}, function(err, user){
            if(!user){
                user = new User(defaultUser);
                user.hashedPassword = user.encrypt("maksimpassword");
                user.save(function(err){
                    if(err){
                        console.log("Problem with register default user ", err);
                    } else {
                        console.log("Default user registered");
                    }
                });
            } else {
                console.log("Default user already registered");
            }
        });
    }
};