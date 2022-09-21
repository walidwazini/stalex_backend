const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = require('../utils/generate-token')
const User = require('../models/user')


exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) return res.status(404).json({ message: 'User already exist.' })

    if (password !== confirmPassword) return res.status(404).json({ message: 'Password don\'t match.' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({ name, email, password: hashedPassword })

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SCERET,
      { expiresIn: '30d' }
    )

    res.status(200).json({ newUser, token })

  } catch (err) {
    res.status(500).json(err)
  }
})