const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = require('../utils/generate-token')
const User = require('../models/user')

//   REGISTER
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


//   SIGN IN   
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser) return res.status(404).json({ message: `User for this email not found.` })

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SCERET,
      { expiresIn: '30d' }
    )

    res.status(200).json({ existingUser, token })

  } catch (err) {
    res.status(500).json(err)
  }
})


//   USER PROFILE
exports.getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      })
    }
  } catch (err) {
    res.status(401).json(err)
  }
})