const mongoosePaginate = require('mongoose-paginate-v2')

const mongoose = require('../connection')
const { parseDate } = require('../../services/date')

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
      enum: ['ON', 'OFF'],
      default: 'ON'
    },
    batteryStat: {
      type: String,
      enum: ['OK', 'ERR'],
      default: 'OK'
    },
    waterUsage: {
      type: Number,
      default: 0
    },
    currentTemperature: {
      type: Number,
      default: 0
    },
    currentHumidity: {
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
  const { __v, _id, createdAt, updatedAt, ...object } = this.toObject()
  const meter = {
    id: _id,
    ...object,
    createdAt: parseDate(createdAt),
    updatedAt: parseDate(updatedAt)
  }

  return meter
})

const Meter = mongoose.model('Meter', meterSchema)

module.exports = Meter
