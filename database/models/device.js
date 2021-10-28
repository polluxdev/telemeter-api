const mongoose = require('../connection')

const Schema = mongoose.Schema

const deviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    batteryStat: {
      type: String,
      default: 'OK'
    },
    active: {
      type: Boolean,
      default: true
    },
    deletedAt: {
      type: Date
    }
  },
  { timestamps: true }
)

deviceSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } })

  next()
})

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
