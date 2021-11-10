const mongoosePaginate = require('mongoose-paginate-v2')

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

deviceSchema.plugin(mongoosePaginate)

deviceSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } })

  next()
})

deviceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  const device = {
    id: _id,
    ...object
  }
  
  return device
})

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
