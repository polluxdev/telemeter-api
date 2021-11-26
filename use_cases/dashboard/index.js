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
        totalUsage: { $sum: '$waterUsage' },
        maxUsage: { $max: '$waterUsage' },
        minUsage: { $min: '$waterUsage' }
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

const getTopUsage = async (queryString) => {
  const { group, limit = 5 } = queryString
  const match = Object.create({})
  if (group) {
    match['user.group'] = group
  }

  return Meter.aggregate([
    { $sort: { totalUsage: -1 } },
    { $limit: parseInt(limit) },
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
      $project: {
        _id: 0,
        totalUsage: 1,
        userID: { $arrayElemAt: ['$user._id', 0] },
        userName: { $arrayElemAt: ['$user.name', 0] },
        userRole: { $arrayElemAt: ['$user.role', 0] }
      }
    }
  ])
}

module.exports = {
  getUsersCount,
  getMeterTotal,
  getTopUsage
}
