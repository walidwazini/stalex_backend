const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  name: { type: String, },
  email: { type: String, unique: true },
  password: { type: String, },
}, { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)