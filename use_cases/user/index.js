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

const getUsers = async () => {
  return await User.find().then(serialize)
}

const getUser = async (userID) => {
  return await User.findById(userID).then(serialize)
}

const updateUser = async (userID, reqBody) => {
  return await User.findByIdAndUpdate(userID, reqBody, {
    new: true,
    runValidators: true
  }).then(serialize)
}

const deleteUser = async (userID) => {
  return await User.findByIdAndDelete(userID)
}

const checkUser = async (key, value) => {
  return await User.findOne({ [key]: value }).exec()
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  checkUser
}
