const bcrypt = require('bcrypt')
const mongoose = require('../connection')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
    name: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    device: {
      type: mongoose.Schema.ObjectId,
      ref: 'Device'
    },
    confirmationCode: {
      type: String
    },
    role: {
      type: String,
      default: 'user'
    },
    active: {
      type: Boolean,
      default: false
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

userSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.password) return next()

  this._update.password = await bcrypt.hash(this._update.password, 12)

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
