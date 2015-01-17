var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");
var _ = require("lodash");
var mv = require("mv");
var async = require("async");

var schema = new Schema({
    market: {type: Schema.Types.ObjectId, ref: "Market"},
    section: {type: Schema.Types.ObjectId, ref: "Section"},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    family: {type: Schema.Types.ObjectId, ref: "Family"},
    name: {type: String, index: true},
    details: {type: Schema.Types.ObjectId, ref: 'Details'},
    ean: {type: String},
    status: {type:String, enum:["s1", "s2", "s3", "s4"], default: "s1"},
    images: {
        type: [{
            path: {type: String},
            name: {type: String},
            temp: {type: Boolean, default: false}
        }],
        default: []
    },
    prices: [{type: Schema.Types.ObjectId, ref: "ProductPrice"}],
    rating: {type: Number, default: 0},
    addingInBasket: {type: Number, default: 0},
    created: {type: Date, default: Date.now}
}, { autoIndex: false});

function randomNumber(){
    return Date.now();
};

schema.methods.setImages = function(infos, callback){
    var self = this;
    if(infos.length === 0){
        callback();
    } else {
        var count = infos.length;
        this.setImage(infos.pop(), function(err){
            count--;
            if(err){
                console.log("Error save product", err);
                if(count == 0){
                    callback(err);
                }
            } else {
                if(count == 0){
                    self.setImages(infos, callback);
                }
            }
        });
    }
};

schema.methods.setImage = function(info, callback){
    var self = this;
    var path;
    info.name = randomNumber() + info.name;
    if(info.temp){
        path = "public/temp/images/" + this._id;
    } else {
        path = "public/images/" + this._id;
    }
    var fn = function(path, callback){
        var imagePath = path + "/" + info.name;
        fs.unlink(imagePath, function(){
            mv(info.image.path, imagePath, function(err) {
                if(err){
                    callback(err);
                } else {
                    var image = imagePath.substr(imagePath.indexOf("/") + 1);
                    self.images.push({
                        path: image,
                        name: info.name,
                        temp: !!info.temp
                    });
                    self.save(callback);
                }
            });
        });
    };
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,  0777);
        fn(path, callback);
    }else{
        fn(path, callback);
    }
};

schema.methods.deleteImage = function(info, callback){
    var image = _.find(this.images, function(image){
        return image.name === info.name;
    });
    fs.unlink(image.path, function(err){
        if(err){
            console.error("Error with unlink image ", err);
            callback(err);
        } else {
            this.images = _.filter(this.images, function(image){
                return image.name !== info.name;
            });
            this.save(callback);
        }
    });
};

schema.methods.acceptImages = function(callback){
    var self = this;
    var images = _.filter(this.images, function(image){
        return image.temp;
    });
    console.log("images ", images);
    async.eachSeries(images, function(image, cb){
       self.acceptImage(image.name, cb);
    }, callback);
};

schema.methods.acceptImage = function(name, callback){
    var self = this;
    var path = "public/images/" + this._id;
    var fn = function(cb){
        var image = _.find(self.images, function(image){
            return image.name === name;
        });
        var path = "public/images/" + self._id + "/" + name;

        mv("public/" + image.path, path, function(err){
            if(err){
                console.error("Error with move image ", err);
                cb(err);
            } else {
                for(var i in self.images){
                    if(self.images[i].name == name){
                        var imagePath = path.substr(path.indexOf("/") + 1);
                        self.images[i].path = imagePath;
                        self.images[i].temp = false;
                    }
                }
                self.save(cb);
            }
        });
    };
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,  0777);
        fn(callback);
    }else{
        fn(callback);
    }
};

module.exports = schema;