const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const UserRoutes = express.Router()

UserRoutes.post('/signup', UserCtrl.registerUser)

module.exports = UserRoutes