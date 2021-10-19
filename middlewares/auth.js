const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const userDb = require('../use_cases/user')
const config = require('../config')

exports.protectRoute = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization

  let token
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('Unauthorized!', 401))
  }

  const decoded = await promisify(jwt.verify)(token, config.jwt.JWT_SECRET_KEY)

  const user = await userDb.getUser(decoded.userId)

  if (!user) {
    return next(new AppError('User does no longer exists!', 401))
  }

  req.user = user

  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission!", 403))
    }

    next()
  }
}
