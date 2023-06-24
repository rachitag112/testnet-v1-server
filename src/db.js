const mongoose = require("mongoose");
require('dotenv').config({ path: './.env' })

const URI = process.env.mongo_URI;

const connection = mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

module.exports = connection;
