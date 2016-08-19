var express = require("express");
var mongodb = require('mongodb');
var app = express();

var urlShort = require("./url-shortener/server.js");
var timeStamp = require("./timestamp-server/server.js");
var imageSearch = require("./image-search/server.js");
var headerParser = require("./header-parser/server.js");
var fileMeta = require("./file-meta/server.js");

app.get('/', function(req, res){
    res.send('There\'s nothing here');
});

app.use('/url-shortener', urlShort(express, mongodb));
app.use('/timestamp-server', timeStamp(express));
app.use('/image-search', imageSearch(express, mongodb));
app.use('/header-parser', headerParser(express));
app.use('/file-meta', fileMeta(express));

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});