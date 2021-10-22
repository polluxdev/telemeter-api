const User = require('../../database/models/user')
const serialize = require('./serializer')
const AppError = require('../../utils/appError')

const signup = async (reqBody) => {
  const newUser = {
    email: reqBody.email,
    confirmationCode: reqBody.confirmationCode
  }

  return await User.create(newUser)
}

const login = async (reqBody) => {
  const { email, password } = reqBody

  return await User.findOne({ ['email']: email })
    .select('+password')
    .then(async (user) => {
      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError('Incorrect email or password!', 401)
      }

      return user
    })
    .then(serialize)
}

const checkUser = async (key, value) => {
  return await User.findOne({ [key]: value }).exec()
}

module.exports = {
  signup,
  login,
  checkUser
}
