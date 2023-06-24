const mongoose = require('mongoose');
const db = require('../db');

const schema = new mongoose.Schema({
    metadata:{
        type:JSON
    },
    buyerAddress:{
        type:Number
    },
    nftAddress:{
        type:Number
    },
    nftId:{
        type:Number
    }
});

const transfer = mongoose.model('transfers', schema);

module.exports = transfer;