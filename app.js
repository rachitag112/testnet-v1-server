const serverless = require('serverless-http');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const assetsRouter = require('./src/assetsRoutes2')
const db = require('./src/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', assetsRouter)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

module.exports = serverless(app);