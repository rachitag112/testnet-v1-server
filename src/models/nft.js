const mongoose = require('mongoose')
const db = require('../db')

const schema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: [true, 'A collection must have an address'],
    unique: true,
  },
  contractAddress: {
    type: Number,
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
})
const nft = mongoose.model('nfts', schema)

module.exports = nft
