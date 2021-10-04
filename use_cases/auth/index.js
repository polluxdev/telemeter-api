const User = require('../../models/user')
const serialize = require('./serializer')
const bcrypt = require('bcrypt')

const signup = async (reqBody) => {
  const hashedPassword = await bcrypt.hash(reqBody.password, 12)
  const newUser = {
    email: reqBody.email,
    password: hashedPassword
  }

  return await User.create(newUser).then(serialize)
}

const login = async (reqBody) => {
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

module.exports = {
  signup,
  login
}
