const mongoosePaginate = require('mongoose-paginate-v2')

const mongoose = require('../connection')

const Schema = mongoose.Schema

const groupSchema = new Schema(
  {
    regionName: {
      type: String
    },
    regionCode: {
      type: String
    },
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
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

groupSchema.plugin(mongoosePaginate)

groupSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } })

  next()
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
