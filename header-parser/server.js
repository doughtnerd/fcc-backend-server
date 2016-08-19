var express = require("express");
var app = express();

app.get('/', function(req, res){
    var heads = req.headers
    var ip = heads['x-forwarded-for'];
    var lang = heads['accept-language'];
    lang = lang.split(',')[0];
    var soft = heads['user-agent'];
    soft = soft.substring(soft.indexOf('(')+1, soft.indexOf(')'));
    var obj = {ipaddress:ip, language:lang, software:soft};
    res.send(JSON.stringify(obj));
});

module.exports = app;