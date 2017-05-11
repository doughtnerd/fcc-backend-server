const express = require("express");
const app = express();
const upload = require("multer")();

app.use(express.static(__dirname + "/client"));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/client/index.html");
});

app.post('/get-meta', upload.single('upl') , function(req, res){
    var file = req.file;
    res.send({size:file.size});
});

module.exports = app;
