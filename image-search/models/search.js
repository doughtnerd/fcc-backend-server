'use strict';

const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
    term:{type:String, trim:true, required:true},
    when:{type:Date, required:true }
});

searchSchema.set('collection', 'image-history');

module.exports = mongoose.model('search', searchSchema);
