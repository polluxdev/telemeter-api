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
    { $sort: { waterUsage: -1 } },
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
        waterUsage: 1,
        userID: { $arrayElemAt: ['$user._id', 0] },
        userName: { $arrayElemAt: ['$user.name', 0] },
        userRole: { $arrayElemAt: ['$user.role', 0] }
      }
    }
  ])
}

const getTrafficUsage = async (queryString) => {
  const { group, days = 7 } = queryString
  const match = Object.create({})
  if (group) {
    match['user.group'] = group
  }

  const today = new Date()
  const oneDay = 1000 * 60 * 60 * 24
  const start = today
  const end = new Date(today.valueOf() - (days - 1) * oneDay)

  match['$and'] = [{ createdAt: { $lte: start } }, { createdAt: { $gte: end } }]

  const project = Object.create({
    _id: 0,
    waterUsage: 1
  })
  const groupAgg = Object.create({
    _id: 0,
    totalCount: { $sum: 1 }
  })
  const projectAgg = Object.create({
    _id: 0,
    totalCount: 1
  })

  d = 0
  while (d < days) {
    const date = new Date(today.valueOf() - d * oneDay)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const param = [year, month, day].join('-')

    project[param] = {
      $and: [
        { $eq: [{ $year: { date: '$createdAt', timezone: '+07' } }, year] },
        { $eq: [{ $month: { date: '$createdAt', timezone: '+07' } }, month] },
        { $eq: [{ $dayOfMonth: { date: '$createdAt', timezone: '+07' } }, day] }
      ]
    }

    groupAgg[param] = {
      $sum: { $cond: [{ $eq: ['$' + param, true] }, '$waterUsage', 0] }
    }

    projectAgg[param] = 1

    d++
  }

  return Meter.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $match: match
    },
    { $project: project },
    { $group: groupAgg },
    { $project: projectAgg }
  ])
}

module.exports = {
  getUsersCount,
  getMeterTotal,
  getTopUsage,
  getTrafficUsage
}
