const express = require('express')
const { ethers } = require('ethers')
const router = express.Router()
const nfts = require('./models/nft')
const subscriber = require('./models/subscriber')
const path = require('path')

router.get('/assets', async (req, res) => {
  const projection = { contractAddress: 1, owner: 1, price: 1, state: 1 }
  let allAssets
  console.log(req.query)
  if (req.query.owner) {
    console.log(req.query.owner)
    allAssets = await nfts.find(req.query)
    console.log(allAssets)
  } else {
    allAssets = await nfts.find() // await the find() method to ensure it completes
  }
  res.json(allAssets) // Send the entire array of assets as a JSON response
})

router.get('/assets/:collectionAddress', async (req, res) => {
  console.log('fjskdjfk')
  const collection = await nfts.find({
    contractAddress: req.params.collectionAddress,
    state: 'LISTED',
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
  res.send(nft)
})

router.post('/mint', async (req, res) => {
  try {
    const contractABI = require('./contractABI.json')
    const contractAddress = '0x003109d0b9C15A82665EF6E1C06094C8A231b0fe'
    const signer = req.body.signer
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    const result = await contract.mintNft(1)
    res.json(result)
    console.log(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to get data from the contract' })
  }
})

router.post('/subscriber', async (req, res) => {
  console.log(req.body)
  const email = req.body.email

  const emailExist = await subscriber.findOne({ email: email })
  if (emailExist) return res.send('Email already exists')
  else {
    let data = await subscriber.create({ email })
    data.save()

    res.send('Email added successfully')
  }
})

router.patch('/addressLower', async (req, res) => {
  await nfts.updateMany(
    {},
    { $set: { owner: '0x45f0bf42fc26923e88a46b15ad22b89fa50dbb37' } }
  );
  res.send('done');
});

router.patch('/State', async (req, res) => {
  try {
    console.log('fksdjfsjkgj')
    console.log(req.body)
    const filter = {
      contractAddress: req.body.contractAddress,
      tokenId: req.body.tokenId,
    }
    const update = {
      state: req.body.state,
      owner: req.body.owner.toLowerCase(),
    }
    console.log('filter', filter)
    console.log('update', update)
    const nft = await nfts.findOneAndUpdate(filter, update)
    res.send('State updated')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
})

router.post('/assets', async (req, res) => {
  try {
    for (let i = 1; i < 9; i++) {
      const nft = {
        tokenId: i,
        contractAddress: '0xafd2cda3ea9d6779f6910c5c97bc98c04e65ad2b',
        metadata: {
          name: 'GearFi-testnet-Azuki',
          description: 'GearFi testnet-V1 Azuki NFT',
          imageURI: `ipfs://QmQnz2urCiYDKv429cmEjc33eQVWLcVh7bVn4Uj2k2GKq8/${i}.avif`,
        },
        price: 5,
        state: 'LISTED',
        owner: '0x45F0bF42fc26923e88a46b15Ad22B89fA50Dbb37',
      }
      const newNfts = await nfts.create(nft)
    }

    res.status(201).json({
      status: 'success posting',
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
})

module.exports = router
