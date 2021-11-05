const bcrypt = require('bcrypt')
const mongoosePaginate = require('mongoose-paginate-v2')

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
      enum: ['super', 'admin', 'user'],
      default: 'user'
    },
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
      }
    ],
    active: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date
    }
  },
  { timestamps: true }
)

userSchema.plugin(mongoosePaginate)

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
  if (!this._update.password && !this._update.confirmNewPassword) return next()

  let password = this._update.confirmNewPassword || this._update.password
  this._update.password = await bcrypt.hash(password, 12)

  next()
})

userSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } })

  next()
})

userSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
