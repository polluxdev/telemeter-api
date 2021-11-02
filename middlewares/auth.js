const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const i18n = require('i18n')

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
    return next(new AppError(i18n.__('error.auth.unauthorized'), 401))
  }

  const decoded = await promisify(jwt.verify)(token, config.jwt.JWT_SECRET_KEY)

  const user = await userDb.getUser(decoded.userId)

  if (!user) {
    return next(new AppError(i18n.__('error.user.not_exists'), 401))
  }

  req.user = user

  next()
})

exports.checkAuth = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError(i18n.__('error.auth.unauthorized'), 401))
  }

  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next(new AppError(i18n.__('error.auth.not_have_permission'), 403))
    }

    next()
  }
}
