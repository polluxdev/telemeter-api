const User = require('../../database/models/user')
const serialize = require('./serializer')

const getUsers = async () => {
  return await User.find().then(serialize)
}

const getUser = async (userID) => {
  return await User.findById(userID).then(serialize)
}

const updateUser = async (userID, reqBody) => {
  console.log(reqBody)
  return await User.findByIdAndUpdate(userID, reqBody, {
    new: true,
    runValidators: true
  }).then(serialize)
}

const deleteUser = async (userID) => {
  return await User.findByIdAndDelete(userID)
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
