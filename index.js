const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/', (req, res) => {
  res.json({ msg: 'Welcome to Stalex API' })
})

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, console.log(`Server on port:${PORT}.`))
  })
  .catch(err => console.log(err))

