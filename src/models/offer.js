const mongoose = require('mongoose');
const db = require('../db');

const schema = new mongoose.Schema({
    metadata:{
        type:JSON
    },
    buyerAddress:{
        type:Number
    },
    sellerPrice:{
        type:Number
    },
    offerPrice:{
        type:Number
    },
    expiration:{
        type:Date
    },
    nftAddress:{
        type:Number
    },
    nftId:{
        type:Number
    }
});

const offer = mongoose.model('offers', schema);

module.exports = offer;