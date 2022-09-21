const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const Product = require('../models/product')

exports.create = asyncHandler(async (req, res) => {
  const productDetails = req.body
  const newProduct = new Product({ ...productDetails })

  try {
    await newProduct.save()
    res.status(200).json(newProduct)
  } catch (err) {
    console.log(err)
  }

})