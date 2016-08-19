var mongo = require('mongodb').MongoClient;
var Bing = require('bing.search');
var express = require("express");
var extract = require("./json-extractor.js");

var app = express();
var db = process.env.MONGOLAB_URI;
var apiKey = process.env.BING_API_KEY;
//"mongodb://USER:PASS@ds031835.mlab.com:31835/fcc-url-shortener-db"

app.set('view engine', 'pug');
app.set('views', __dirname + '/views/');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/history', function(req, res){
    mongo.connect(db, function(err, db){
        if(!err){
            var collection = db.collection('image-history');
            collection.find(null, {"_id":0}).toArray(function(err, data){
                if(!err){
                    res.send(data);
                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    });
});

app.get('/search/:query', function(req, res){
   var query = req.params.query;
   var amount = req.query.offset || 10;
   var search = new Bing(apiKey);
   search.images(query, {top:amount}, function(err, results){
       if(!err){
           var retVal = extract(['title', 'url', 'thumbnail', 'sourceUrl'], results);
           retVal.forEach(function(value){
               value.thumbnail = value.thumbnail.url;
           });
           var history = {
              "term": query,
              "when": new Date().toLocaleString()
            };
            mongo.connect(db, function(err, db){
                if(!err){
                    var collection = db.collection("image-history");
                    collection.insert(history);
                    res.send(retVal);
                } else {
                    res.send(err);
                }
            });
       } else {
           res.send("Encountered error: " + err);
       }
   });
});
module.exports = app;