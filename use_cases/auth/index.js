const i18n = require('i18n')

const User = require('../../database/models/user')
const serialize = require('./serializer')
const AppError = require('../../utils/appError')

const signup = async (reqBody) => {
  const newUser = {
    email: reqBody.email,
    confirmationCode: reqBody.confirmationCode
  }

  return await User.create(newUser).then(serialize)
}

const login = async (reqBody) => {
  const { email, password } = reqBody

  return await User.findOne({ ['email']: email })
    .select('+password')
    .then(async (user) => {
      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError(i18n.__('error.auth.wrong_email_password'), 401)
      }

      return user
    })
    .then(serialize)
}

const forgotPassword = async (reqBody) => {
  const user = {
    email: reqBody.email,
    confirmationCode: reqBody.confirmationCode
  }

  return await User.findOne(user).then(serialize)
}

module.exports = {
  signup,
  login,
  forgotPassword
}
