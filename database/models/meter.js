const mongoose = require('../connection')

const Schema = mongoose.Schema

const meterSchema = new Schema(
  {
    device: {
      type: mongoose.Schema.ObjectId,
      ref: 'Device'
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

const Meter = mongoose.model('Meter', meterSchema)

module.exports = Meter
