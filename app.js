const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({ path: './.env' })
const assetsRouter = require('./src/assetsRoutes')
const db = require('./src/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', assetsRouter)

// router.get("/", (req, res) => {
//   res.send("GearFi Rocks!");
// });

const port = process.env.PORT
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

module.exports = app