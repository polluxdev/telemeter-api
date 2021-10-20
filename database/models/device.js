const mongoose = require('../connection')

const Schema = mongoose.Schema

const deviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
