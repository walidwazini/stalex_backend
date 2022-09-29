const express = require('express')

const protect = require('../middleware/authMiddleware')
const OrderCtrl = require('../controllers/order-ctrl')

const OrderRoutes = express.Router()

// Create Order
OrderRoutes.post('/', protect, OrderCtrl.createOrder)

module.exports = OrderRoutes