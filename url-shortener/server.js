'use strict';

const express = require("express");
const mongodb = require('mongodb');
const valid = require('valid-url');

//const mongo = mongodb.MongoClient;
const app = express();

//const db = process.env.MONGOLAB_URI;

const lib = require("./lib");

app.set('view engine', 'pug');
app.set('views', __dirname + '/views/');


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/:id', function(req, res){
    lib.findAsync({short_url:+req.params.id}, {_id:0, __v:0}).then(function(result){
        if(result){
            res.redirect(result.original_url);
        } else {
            res.status(400).send(Error("Could not find url").toString());
        }
    }).catch(function(err){
        res.status(400).send(err.toString());
    });
});

app.get('/new/:url*', function(req, res){
    let promise = new Promise(function(resolve, reject){
        let url = req.url.slice(5);
        if(valid.isUri(url)){
            resolve(url);
        } else {
            reject(Error("Invalid URL"));
        }
    });
    
    promise.then(function(result){
        let shortID = Math.floor(100000 + Math.random() * 900000);
        return lib.createAsync({original_url:result, short_url:shortID});
    }).then(function(result){
        return result.save();
    }).then(function(result){
        res.status(201).send(result);
    }).catch(function(err){
        res.status(400).send(err.toString());
    });
});

module.exports = app;