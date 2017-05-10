var express = require("express");
var mongodb = require('mongodb');
var multer = require("multer");
var search = require("bing.search");
var url = require('valid-url');
var app = express();

var urlShort = require("./url-shortener/server.js");
var timeStamp = require("./timestamp-server/server.js");
var imageSearch = require("./image-search/server.js");
var headerParser = require("./header-parser/server.js");
var fileMeta = require("./file-meta/server.js");

app.set('view engine', 'pug');
//app.set('views', __dirname + '/views/');

app.get('/', function(req, res){
    res.send('There\'s nothing here');
});

app.use('/url-shortener', urlShort(mongodb, url));
app.use('/timestamp-server', timeStamp(express));
app.use('/image-search', imageSearch(express, mongodb, search));
app.use('/header-parser', headerParser(express));
app.use('/file-meta', fileMeta(express, multer));

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});