'use strict';

const bing = require("bing.search");
const mongo = require('mongodb').MongoClient;
const extract = require("./json-extractor.js");
const mongoose = require("mongoose");
const app = require("express")();

const lib = require("./lib");

const db = process.env.MONGOLAB_URI;
const apiKey = process.env.BING_API_KEY;

mongoose.connect(db);

app.set('view engine', 'pug');
app.set('views', __dirname + '/views/');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/history', function(req, res){
    lib.find(null, {"_id":0}).then(function(results){
        let mapped = results.map(function(current, index){
            return {term:current.term, when:current.when.toLocaleString()};
        });
        res.status(200).send(mapped);
    }).catch(function(err){
        res.status(400).send(err.toString());
    });
});

app.get('/search/:query', function(req, res){
    const query = req.params.query;
    
    let promise = new Promise(function(resolve, reject){
        let amount = req.query.offset || 10;
        let search = new bing(apiKey);
        search.images(query, {top:amount}, function(err, results){
            if(!err){
               resolve(results);
            } else {
               reject(err);
            }
        });
    });
    
    promise.then(function(results){
        let retVal = extract(['title', 'url', 'thumbnail', 'sourceUrl'], results);
        retVal.forEach(function(value){
            value.thumbnail = value.thumbnail.url;
        });
        let history = lib.create({term:query, when:new Date.now()});
        return history.save();
    }).then(function(results){
        res.status(200).send(results);
    }).catch(function(err){
        res.status(400).send(err.toString());
    });
});

module.exports = app;
