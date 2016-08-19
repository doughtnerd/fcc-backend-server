var express = require("express");
var multer = require("multer");
var app = express();
var upload = multer();

app.use(express.static(__dirname + "/client"));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/client/index.html");
});

app.post('/get-meta', upload.single('upl') , function(req, res){
    var file = req.file;
    res.send({size:file.size});
});

module.exports = app;