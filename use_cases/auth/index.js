const User = require('../../database/models/user')
const serialize = require('./serializer')
const AppError = require('../../utils/appError')

const signup = async (reqBody) => {
  const newUser = {
    email: reqBody.email,
    password: reqBody.password,
    device: reqBody.device
  }

  return await User.create(newUser).then(serialize)
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

const checkUser = async (reqBody) => {
  return await User.findOne({ email: reqBody.email }).exec()
}

module.exports = {
  signup,
  login,
  checkUser
}
