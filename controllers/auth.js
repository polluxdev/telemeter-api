const i18n = require('i18n')
const crypto = require('crypto')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const authDb = require('../use_cases/auth')
const userDb = require('../use_cases/user')

const email = require('../services/mail')
const authService = require('../services/auth')

exports.signup = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await userDb.checkUser('email', reqBody.email)
  if (user) {
    throw new AppError(i18n.__('error.user.exists'), 422)
  }

  reqBody.confirmationCode = crypto.randomBytes(48).toString('hex')
  const data = await authDb.signup(reqBody).catch((err) => {
    console.log(err)
    throw new AppError(i18n.__('error.auth.sign_up_failed'), 502)
  })
  await email.setEmailVerification(reqBody).catch((err) => {
    console.log(err)
    throw new AppError(i18n.__('error.email.send_failed'), 502)
  })

  const response = {
    success: true,
    message: i18n.__('success.email.send_success'),
    data
  }

  res.status(201).json(response)
})

exports.login = catchAsync(async (req, res, next) => {
  const data = await authDb.login(req.body)

  const response = {
    success: true,
    data
  }

  const cookieOption = await authService.createCookie()

  res.cookie('jwt', data.token, cookieOption)
  res.status(200).json(response)
})

exports.register = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await userDb.checkUser('confirmationCode', req.query.key)
  if (!user) {
    throw new AppError(i18n.__('error.link.expired'), 422)
  }

  reqBody.active = true
  reqBody.$unset = { confirmationCode: 1 }
  const data = await userDb.updateUser(user.id, reqBody).then(async (data) => {
    const loginData = {
      email: data.email,
      password: reqBody.password
    }
    return await authDb.login(loginData)
  })

  const response = {
    success: true,
    data
  }

  const cookieOption = await authService.createCookie()

  res.cookie('jwt', data.token, cookieOption)
  res.status(201).json(response)
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await userDb.checkUser('email', reqBody.email)
  if (!user) {
    throw new AppError(i18n.__('error.user.not_found'), 422)
  }

  reqBody.confirmationCode = crypto.randomBytes(48).toString('hex')
  const data = await userDb.updateUser(user.id, reqBody).then(() => {
    return authDb.forgotPassword(reqBody)
  })
  await email.setEmailForgotPassword(reqBody).catch((err) => {
    console.log(err)
    throw new AppError(i18n.__('error.email.send_failed'), 502)
  })

  const response = {
    success: true,
    message: i18n.__('success.email.send_success'),
    data
  }

  res.status(201).json(response)
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await userDb.checkUser('confirmationCode', req.query.key)
  if (!user) {
    throw new AppError(i18n.__('error.link.expired'), 422)
  }

  reqBody.$unset = { confirmationCode: 1 }
  const data = await userDb.updateUser(user.id, reqBody).then(async (data) => {
    const loginData = {
      email: data.email,
      password: reqBody.password
    }
    return await authDb.login(loginData)
  })

  const response = {
    success: true,
    data
  }

  const cookieOption = await authService.createCookie()

  res.cookie('jwt', data.token, cookieOption)
  res.status(201).json(response)
})
