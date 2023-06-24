const mongoose = require('mongoose');
const db = require('../db');

const schema = new mongoose.Schema({
    email:{
        type:String
    }
});

const subscriber = mongoose.model('subscriber', schema);

module.exports = subscriber;