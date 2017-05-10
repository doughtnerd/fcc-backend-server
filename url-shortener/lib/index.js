'use strict';

const models = require("../models");

module.exports={
    create : function(data){
        return new models.url(data);  
    },
    createAsync : function(data){
        return new Promise(function(resolve, reject){
           if(data.hasOwnProperty("original_url") && data.hasOwnProperty("short_url")){
               resolve(new models.url(data));
           } else {
               reject(Error("Data did not contain the proper url info."));
           }
        });
    },
    saveAsync : function(url){
        return new Promise(function(resolve, reject){
            if(url instanceof models.url){
                resolve(url.save());
            } else {
                reject(Error("Parameter was not an instance of a url"));
            }
        });
    },
    findAsync : function(query, fields){
        fields = fields == undefined ? {_id:0, __v:0} : fields;
        return models.url.findOne(query, fields).exec();
    }
};