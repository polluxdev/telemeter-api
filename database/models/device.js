const mongoosePaginate = require('mongoose-paginate-v2')

const mongoose = require('../connection')
const { parseDate } = require('../../services/date')

const Schema = mongoose.Schema

const deviceSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    deletedAt: {
      type: Date
    }
  },
  { timestamps: true }
)

deviceSchema.set('toJSON', { virtuals: true })
deviceSchema.set('toObject', { virtuals: true })

deviceSchema.plugin(mongoosePaginate)

deviceSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } })

  next()
})

deviceSchema.method('toJSON', function () {
  const { __v, _id, createdAt, updatedAt, ...object } = this.toObject()
  const device = {
    id: _id,
    ...object,
    createdAt: parseDate(createdAt),
    updatedAt: parseDate(updatedAt)
  }

  return device
})

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
