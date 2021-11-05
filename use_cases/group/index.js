const i18n = require('i18n')

const Group = require('../../database/models/group')
const serialize = require('./serializer')
const AppError = require('../../utils/appError')
const { randomString } = require('../../services/generator')

const createGroup = async (reqBody) => {
  const code = randomString(3)
  const newGroup = {
    regionName: reqBody.regionName,
    regionCode: code,
    admin: reqBody.admin
  }

  return await Group.create(newGroup).then(serialize)
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

  return await Group.paginate(query, { page, limit, customLabels }).then(
    serialize
  )
}

const getGroup = async (groupID) => {
  return await Group.findById(groupID).then(serialize)
}

const updateGroup = async (groupID, reqBody) => {
  if (reqBody.hasOwnProperty('user')) {
    reqBody['$push'] = { users: { _id: reqBody.user } }
  }

  return await Group.findByIdAndUpdate(groupID, reqBody, {
    new: true,
    runValidators: true
  }).then(serialize)
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
  ).then(serialize)
}

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup
}
