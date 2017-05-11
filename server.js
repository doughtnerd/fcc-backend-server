var express = require("express");
var app = express();

app.set('view engine', 'pug');
//app.set('views', __dirname + '/views/');

app.get('/', function(req, res){
    res.send("There's nothing here.");
});

app.use('/url-shortener', require("./url-shortener"));
app.use('/timestamp-server', require("./timestamp-server"));
app.use('/image-search', require("./image-search"));
app.use('/header-parser', require("./header-parser"));
app.use('/file-meta', require("./file-meta"));

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});