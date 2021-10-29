const AppError = require('../../utils/appError')

const User = require('../../database/models/user')
const serialize = require('./serializer')

const checkUser = async (userID, reqBody) => {
  return await User.findById(userID)
    .select('+password')
    .then(async (user) => {
      console.log(user)
      if (
        !user ||
        !(await user.correctPassword(reqBody.oldPassword, user.password))
      ) {
        throw new AppError('Incorrect old password!', 401)
      }

      return user
    })
    .then(serialize)
}

module.exports = { checkUser }
