const express = require("express");
const { ethers } = require("ethers");
const router = express.Router();
const nfts = require("./models/nft");
const subscriber = require("./models/subscriber");
const path = require("path");

router.get("/assets", async (req, res) => {
  const projection = { contractAddress: 1, owner: 1, price: 1, state: 1 };
  let allAssets;
  console.log(req.query);
  if (req.query.owner) {
    allAssets = await nfts.find(req.query);
  } else {
    allAssets = await nfts.find(); // await the find() method to ensure it completes
  }
  res.json(allAssets); // Send the entire array of assets as a JSON response
});

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

router.get("/assets/:collectionAddress", async (req, res) => {
  const collection = await nfts.find({
    contractAddress: req.params.collectionAddress,
    state: "listed",
  });
  res.json(collection);
});

router.get("/assets/:collectionAddress/:nftId", async (req, res) => {
  const collectionAddress = req.params.collectionAddress;
  const nftId = req.params.nftId;
  const nft = await nfts.find({
    contractAddress: collectionAddress,
    tokenId: nftId,
  });
  res.send(nft);
});

router.post("/subscriber", async (req, res) => {
  const email = req.body.email;

  const emailExist = await subscriber.findOne({ email: email });
  if (emailExist) return res.send("Email already exists");

  let data = await subscriber.create({ email });
  data.save();

  res.send("Email added successfully");
});

router.patch('/State', async (req, res) => {
  try {
    const filter = {
      contractAddress: req.body.contractAddress,
      tokenId: req.body.tokenId,
    }
    console.log(req.body)
    const update = {
      state: req.body.state,
      owner: req.body.owner
    }
    const nft = await nfts.findOneAndUpdate(filter, update)
    res.send('State updated')
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
})

module.exports = router
