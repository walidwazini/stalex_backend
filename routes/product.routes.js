const express = require('express')

const ProductCtrl = require('../controllers/product-ctrl')

const ProductRoutes = express.Router()

ProductRoutes.post('/', ProductCtrl.create)

module.exports = ProductRoutes