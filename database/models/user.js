const bcrypt = require('bcrypt')
const mongoose = require('../connection')

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
    },
    name: {
      type: String,
      minlength: 2
    },
    device: {
      id: String
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  next()
})

userSchema.methods.correctPassword = async function (
  inputPassword,
  currentPassword
) {
  return await bcrypt.compare(inputPassword, currentPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
