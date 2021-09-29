const User = require('../../../db/mongodb/schema/user')
const makeUser = require('../../../entities/user/index')
const serialize = require('./serializer')
const bcrypt = require('bcrypt')

exports.signup = async (reqBody) => {
  const user = makeUser(reqBody)
  const hashedPassword = await bcrypt.hash(user.getPassword(), 12)
  const newUser = {
    email: user.getEmail(),
    password: hashedPassword
  }

  return await User.create(newUser).then(serialize)
}

exports.login = async (reqBody) => {
  const loginData = { ...reqBody }

  return await User.findOne({ ['username']: loginData.username })
    .select('+password')
    .then(async (user) => {
      if (
        !user ||
        !(await user.correctPassword(loginData.password, user.password))
      ) {
        throw new Error('Incorrect email or password!')
      }

      return user
    })
    .then(serialize)
}
