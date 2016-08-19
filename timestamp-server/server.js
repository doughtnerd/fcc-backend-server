var express = require('express');
var app = express();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
app.set('view engine', 'pug');
app.set('views', __dirname + '/views/');

app.get('/', function(req, res){
    res.render('index')
});

app.get('/:ts', function(req, res){
    var stamp = req.params.ts;
    var date = new Date(stamp);
    var isDate=date instanceof Date && !isNaN(date.valueOf())
    var isUnix = !isNaN(stamp);
    var obj;
    if(isUnix){
        date = new Date(0);
        date.setSeconds(stamp)
        obj = {unix:+stamp, natural:months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()};
        
    } else if(isDate){
        obj = {unix:Date.parse(stamp)/1000, natural:months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()};
    } else {
        obj = {unix:null, natural:null};
    }
    res.send(JSON.stringify(obj));
});

module.exports = app;