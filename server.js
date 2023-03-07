const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const schedulesRouter = require('./routes/schedules')

app.use('/schedules', schedulesRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
