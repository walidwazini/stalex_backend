const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const ProductRoutes = require('./routes/product.routes')
const UserRoutes = require('./routes/user.routes')
const OrderRoutes = require('./routes/order.routes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Stalex API' })
})


app.use('/api/product', ProductRoutes)
app.use('/api/auth', UserRoutes)
app.use('/api/order', OrderRoutes)


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, console.log(`Server on port:${PORT}.`))
  })
  .catch(err => console.log(err))

