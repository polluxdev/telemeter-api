const mongoose = require('../connection')

const Schema = mongoose.Schema

const waterSchema = new Schema(
  {
    device: {
      type: mongoose.Schema.ObjectId,
      ref: 'Device'
    },
    valveStat: {
      type: String
    },
    batteryStat: {
      type: String
    },
    totalUsage: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Water = mongoose.model('Water', waterSchema)

module.exports = Water
