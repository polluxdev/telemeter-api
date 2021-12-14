const Group = require('../../database/models/group')
const User = require('../../database/models/user')

const { randomString } = require('../../services/generator')
const config = require('../../config')

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
  const { page = 1, limit = config.query.QUERY_LIMIT, ...fields } = queryString
  const query = Object.create({})
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      if (
        fields[property] == true ||
        fields[property] == false ||
        fields[property] == 'true' ||
        fields[property] == 'false'
      ) {
        query[property] = fields[property]
        continue
      }
      query[property] = new RegExp(fields[property], 'i')
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
  if (groupID.hasOwnProperty('regionName')) {
    const param = groupID
    const query = Object.create({})
    if (Object.keys(param).length > 0) {
      for (const property in param) {
        query[property] = param[property]
      }
    }

    return await Group.findOne(query).populate('admin users')
  }

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
        group: group.id,
        active: false
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

const insertUser = async (groupId, reqBody) => {
  const { ...user } = reqBody
  const param = { $push: {} }
  if (Object.keys(user).length > 0) {
    for (const property in user) {
      Object.assign(param['$push'], { [property]: user[property] })
    }
  }

  return await Group.findByIdAndUpdate(groupId, param, {
    new: true,
    runValidators: true
  }).then(async (group) => {
    return await Group.findById(group._id)
  })
}

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  insertUser
}
