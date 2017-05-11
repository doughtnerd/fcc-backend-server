'use strict';

const models = require("../models");

module.exports = {
    create : function(data){
        return new models.search(data);
    },
    save : function(search){
        let check = new Promise(function(resolve, reject){
           if(search instanceof models.search){
               resolve(search);
           } else {
               reject(Error("Parameter was not an instance of a search"));
           }
        });
    },
    find : function(query, fields){
        return models.search.find(query, fields).exec();
    }
};