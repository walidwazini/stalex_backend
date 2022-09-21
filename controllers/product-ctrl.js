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

exports.getAllProducts = asyncHandler(async (req, res) => {
  // const pageSize = 6
  // const page = Number(req.query.pageNumber) || 1


  const products = await Product.find().sort({ _id: -1 })

  res.json(products)
})

exports.getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})