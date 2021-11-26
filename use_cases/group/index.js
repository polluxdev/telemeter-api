const Group = require('../../database/models/group')
const User = require('../../database/models/user')
const serialize = require('./serializer')
const { randomString } = require('../../services/generator')

const createGroup = async (reqBody) => {
  const code = randomString(3)
  const newGroup = {
    regionName: reqBody.regionName,
    regionCode: code,
    admin: reqBody.admin
  }

  const group = await Group.create(newGroup).then(async (group) => {
    await User.findByIdAndUpdate(reqBody.admin, {
      role: 'admin',
      group: group.id,
      active: false
    })

    return group
  })

  return await Group.populate(group, { path: 'admin users' })
}

const getGroups = async (queryString) => {
  const { page = 1, limit = 5, ...fields } = queryString
  const query = Object.create({})
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      query[property] = fields[property]
    }
  }

  const customLabels = {
    totalDocs: 'totalCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage'
  }

  return await Group.paginate(query, {
    populate: 'admin users',
    page,
    limit,
    customLabels
  })
}

const getGroup = async (groupID) => {
  return await Group.findById(groupID).populate('admin users')
}

const updateGroup = async (reqBody) => {
  if (reqBody.hasOwnProperty('user')) {
    reqBody['$push'] = { users: { _id: reqBody.user } }
  }

  if (reqBody.hasOwnProperty('regionCode')) {
    return await Group.findOneAndUpdate(
      { regionCode: reqBody.regionCode },
      reqBody
    ).then(async (group) => {
      await User.findByIdAndUpdate(reqBody.user, {
        group: group.id
      })

      return await User.findById(reqBody.user).populate('group')
    })
  }

  const { id, admin, ...req } = reqBody

  return await Group.findByIdAndUpdate(id, req, {
    new: true,
    runValidators: true
  })
    .populate('admin users')
    .then(async (group) => {
      await User.findByIdAndUpdate(group.admin[0].id, req)

      return group
    })
}

const deleteGroup = async (groupID) => {
  return await Group.findByIdAndUpdate(
    groupID,
    {
      deletedAt: Date.now()
    },
    {
      new: true,
      runValidators: true
    }
  )
}

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup
}
