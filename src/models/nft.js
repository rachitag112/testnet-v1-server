const mongoose = require('mongoose');
const db = require('../db');

const schema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: [true, 'A collection must have a tokenId'],
  },
  contractAddress: {
    type: Number,
    required: [true, 'A collection must have a contractAddress'],
  },
  metadata: {
    type: JSON,
  },
  price: {
    type: Number,
  },
  state: {
    type: String,
  },
  owner: {
    type: String,
  },
  chain: {
    type: String,
  },
});

// Define a compound index on tokenId and contractAddress
// schema.index({ tokenId: 1, contractAddress: 1 }, { unique: true });

const nft = mongoose.model('nfts', schema);

module.exports = nft;
