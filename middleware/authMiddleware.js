const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/user')

const protect = asyncHandler(
  async (req, res, next) => {
    let token
    const authCondition = req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')

    if (authCondition) {
      try {
        token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SCERET)
        console.log(decoded)

        req.user = await User.findById(decoded.id).select('-password')
        next()

      } catch (err) {
        res.status(401)
        throw new Error(`Not authorized, token failed`)
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, token not found.')
    }
  }
)

module.exports = protect