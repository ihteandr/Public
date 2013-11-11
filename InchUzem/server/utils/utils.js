var Tiny = require("tiny");
var utils = {
    set_online: function(ua){
        if(!ua)return;
        Tiny("db/online_users.tiny", function(err, db){
            var time = Date.now()
            if(err){
                console.log("error with open online users db : ", err);
                return;
            }
            db.set(ua, {time: time}, function(err){
                if(err){
                    console.log("error with save online time in db : ", err);
                    return;
                }
            });
        })
    },
    set_offline: function(ua){
        if(!ua)return;
        Tiny("db/online_users.tiny", function(err, db){
            if(err){
                console.log("error with open online users db : ", err);
                return;
            }
            db.remove(ua, function(err){
                if(err){
                    console.log("error with remove online time in db : ", err);
                    return;
                }
            });
        })
    },
    save_user_state: function(user, state){
        Tiny("db/users.tiny", function(err, db){
            var time = Date.now()
            if(err){
                console.log("error with open users db : ", err);
                return;
            }
            user[state] = time;
            db.set(user._id, user, function(err){
                if(err){
                    console.log("error with save user in db : ", err);
                    return;
                }
            });
        })
    },
    answer: function(db_path, uri, id){
        Tiny(db_path, function(err, db){
            if(err){
                console.log("error with open db : ", err);
                res.send({error: err}, 500);
                res.end();
                return;
            }
            db.find({_id : id})(function(err, result){
                if(err){
                    console.log("error with find in db : ", err);
                    res.send({error: err}, 500);
                    res.end();
                    return;
                }
                if(result[0]){
                    res.send(result[0], 200);
                    res.end();
                    return;
                }
                rest_client.get(uri, function(err, r_req, r_res, obj){
                    if(err){
                        console.log("error with get from api : ", err);
                        res.send({error: err}, 500);
                        res.end();
                        return;
                    }
                    if(obj && obj._id){
                        res.send(obj, 200);
                        res.end();
                        return;
                    }
                    res.send({error: "Not Found"}, 200)
                    res.end()
                })
            })
        })
    }
}

module.exports = utils;
