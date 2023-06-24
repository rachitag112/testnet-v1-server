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

router.post("/mint", async (req, res) => {
  try {
    const contractABI = require("./contractABI.json");
    const contractAddress = "0x003109d0b9C15A82665EF6E1C06094C8A231b0fe";
    const signer = req.body.signer;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const result = await contract.mintNft(1);
    res.json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get data from the contract" });
  }
});

router.post("/subscriber", async (req, res) => {
  const email = req.body.email;

  const emailExist = await subscriber.findOne({ email: email });
  if (emailExist) return res.send("Email already exists");

  let data = await subscriber.create({ email });
  data.save();

  res.send("Email added successfully");
});

module.exports = router
