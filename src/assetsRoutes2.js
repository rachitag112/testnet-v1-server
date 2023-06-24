const express = require('express')
const router = express.Router()
const nfts = require('./models/nft')
const path = require('path')

router.get('/assets', async (req, res) => {
  const projection = { contractAddress: 1, owner: 1, price: 1, state: 1 }
  let allAssets;
  console.log(req.query)
  if(req.query.owner){
    allAssets = await nfts.find(req.query)
  }
  else{
    allAssets = await nfts.find() // await the find() method to ensure it completes
  }
  res.json(allAssets) // Send the entire array of assets as a JSON response
})

router.get('/assets/:collectionAddress', async (req, res) => {
  const collection = await nfts.find({
    contractAddress: req.params.collectionAddress,
    'state': "listed",
  })
  res.json(collection)
})

router.get('/assets/:collectionAddress/:nftId', async (req, res) => {
  const collectionAddress = req.params.collectionAddress
  const nftId = req.params.nftId
  const nft = await nfts.find({
    contractAddress: collectionAddress,
    tokenId: nftId,
  })

  res.send(nft[0])
})

router.post('/assets', async (req, res) => {
  try {
    const newNft = await nfts.create(req.body)
    res.status(201).json({
      status: 'success posting',
      data: {
        nft: newNft,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
})
router.delete('/assets/:id', async (req, res)=> {
  console.log(req.params.id)
  await nfts.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
})

module.exports = router
