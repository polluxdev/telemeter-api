const User = require('../../database/models/user')
const Meter = require('../../database/models/meter')

const getUsersCount = async (queryString) => {
  const { page = 1, limit = 5, ...fields } = queryString
  const query = Object.create({})
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      query[property] = fields[property]
    }
  }

  return await User.count(query)
}

const getMeterTotal = async (queryString) => {
  const { group } = queryString
  const match = Object.create({})
  if (group) {
    match['user.group'] = group
  }

  return await Meter.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $match: match },
    {
      $group: {
        _id: null,
        totalUsage: { $sum: '$totalUsage' },
        maxUsage: { $max: '$totalUsage' },
        minUsage: { $min: '$totalUsage' }
      }
    },
    {
      $project: {
        _id: 0,
        totalUsage: 1,
        maxUsage: 1,
        minUsage: 1
      }
    }
  ])
}

module.exports = {
  getUsersCount,
  getMeterTotal
}
