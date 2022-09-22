const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')
const protect = require('../middleware/authMiddleware')

const UserRoutes = express.Router()

UserRoutes.post('/signup', UserCtrl.registerUser)

UserRoutes.post('/signin', UserCtrl.loginUser)

UserRoutes.get('/profile', protect, UserCtrl.getUserProfile)

module.exports = UserRoutes