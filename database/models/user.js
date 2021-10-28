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
      enum: ['root', 'super', 'admin', 'user'],
      default: 'user'
    },
    group: {
      type: String
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
  if (!this._update.confirmNewPassword) return next()

  this._update.password = await bcrypt.hash(this._update.confirmNewPassword, 12)

  next()
})

userSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
