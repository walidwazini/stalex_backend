const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const UserRoutes = express.Router()

UserRoutes.post('/signup', UserCtrl.registerUser)

UserRoutes.post('/signin', UserCtrl.loginUser)

module.exports = UserRoutes