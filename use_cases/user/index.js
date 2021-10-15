const User = require('../../database/models/user')
const serialize = require('./serializer')

const getUsers = async () => {
  return await User.find().then(serialize)
}

module.exports = {
  getUsers
}
