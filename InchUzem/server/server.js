var express = require("express");
var app = express()
require("./config").install(app, express);
app.listen(5555)