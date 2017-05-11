'use strict';

const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    original_url:{type:String, uppercase:true, trim:true, required:true},
    short_url:{type:Number, required:true, unique:true},
});

urlSchema.set('collection', 'urls');

module.exports = mongoose.model('url', urlSchema);