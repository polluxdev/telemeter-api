const User = require('../../database/models/user')
const { serialize } = require('./serializer')

const addUser = async (reqBody) => {
  const newUser = {
    email: reqBody.email,
    password: reqBody.password,
    name: reqBody.name,
    phoneNumber: reqBody.phoneNumber,
    role: reqBody.role,
    group: reqBody.group,
    active: reqBody.active
  }

  return await User.create(newUser)
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

  return await User.paginate(query, {
    populate: 'group device',
    page,
    limit,
    customLabels
  })
}

const getUser = async (userID) => {
  return await User.findById(userID)
}

const updateUser = async (userID, reqBody) => {
  if (reqBody.hasOwnProperty('group')) {
    reqBody['$push'] = { groups: { _id: reqBody.group } }
  }

  return await User.findByIdAndUpdate(userID, reqBody, {
    new: true,
    runValidators: true
  })
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
  )
}

const checkUser = async (key, value) => {
  return await User.findOne({ [key]: value })
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  checkUser
}
