var express = require("express");
var app = express();

var urlShort = require("./url-shortener/server.js");
var timeStamp = require("./timestamp-server/server.js");
var imageSearch = require("./image-search/server.js");
var headerParser = require("./header-parser/server.js");
var fileMeta = require("./file-meta/server.js");

app.get('/', function(req, res){
    res.send('Theres nothing here');
});

app.use('/url-shortener', urlShort);
app.use('/timestamp-server', timeStamp);
app.use('/image-search', imageSearch);
app.use('/header-parser', headerParser);
app.use('/file-meta', fileMeta);

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});