const bcrypt = require('bcrypt')
const mongoose = require('../config/connection')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    }
  },
  { timestamps: true }
)

userSchema.methods.correctPassword = async function (
  inputPassword,
  currentPassword
) {
  return await bcrypt.compare(inputPassword, currentPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
