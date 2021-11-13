const mongoosePaginate = require('mongoose-paginate-v2')

const mongoose = require('../connection')

const Schema = mongoose.Schema

const meterSchema = new Schema(
  {
    device: {
      type: mongoose.Schema.ObjectId,
      ref: 'Device'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    valveStat: {
      type: String,
      default: 'ON'
    },
    batteryStat: {
      type: String,
      default: 'OK'
    },
    totalUsage: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

meterSchema.set('toJSON', { virtuals: true })
meterSchema.set('toObject', { virtuals: true })

meterSchema.plugin(mongoosePaginate)

meterSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  const meter = {
    id: _id,
    ...object
  }

  return meter
})

const Meter = mongoose.model('Meter', meterSchema)

module.exports = Meter
