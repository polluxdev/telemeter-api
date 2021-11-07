const User = require('../../database/models/user')
const serialize = require('./serializer')

const addUser = async (reqBody) => {
  const newUser = {
    email: reqBody.email,
    password: reqBody.password,
    name: reqBody.name,
    phoneNumber: reqBody.phoneNumber,
    active: reqBody.active
  }

  return await User.create(newUser).then(serialize)
}

const getUsers = async (queryString) => {
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

  return await User.paginate(query, { page, limit, customLabels }).then(
    serialize
  )
}

const getUser = async (userID) => {
  return await User.findById(userID).then(serialize)
}

const updateUser = async (userID, reqBody) => {
  if (reqBody.hasOwnProperty('group')) {
    reqBody['$push'] = { groups: { _id: reqBody.group } }
  }

  return await User.findByIdAndUpdate(userID, reqBody, {
    new: true,
    runValidators: true
  }).then(serialize)
}

const deleteUser = async (userID) => {
  return await User.findByIdAndUpdate(
    userID,
    {
      deletedAt: Date.now()
    },
    {
      new: true,
      runValidators: true
    }
  ).then(serialize)
}

const checkUser = async (key, value) => {
  return await User.findOne({ [key]: value })
    .exec()
    .then(serialize)
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  checkUser
}
