var express = require("express");
var fs = require("fs");
var app = express();
var id = 1;
app.use(express.static(__dirname + '/public'));
setInterval(function(){
    if(id == 3){
        id = 1;
    }else {
        id ++;
    }
}, 10000);

app.get("/", function(req, res){
    res.write(fs.readFileSync("./public/build/index.html"));
    res.end();
});

app.get("/data", function(req, res){
    res.write(fs.readFileSync("./data/data_" + id +".json"));
    res.end();
});
app.listen(3000, function(){
   console.log("App listen  localhost:3000");
});