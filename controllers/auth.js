const i18n = require('i18n')

const AppError = require('../utils/appError')
const config = require('../config')
const catchAsync = require('../utils/catchAsync')
const authDb = require('../use_cases/auth')
const deviceDb = require('../use_cases/device')
const transporter = require('../services/mail')

exports.signup = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await authDb.checkUser(reqBody)
  if (user) {
    throw new AppError('User already exists', 422)
  }

  reqBody.device = await deviceDb.createDevice()
  const data = await authDb.signup(reqBody)

  const response = {
    success: true,
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

  res.status(200).json(response)
})

exports.sendVerification = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await authDb.checkUser(reqBody)
  if (user) {
    throw new AppError('User alread exists', 422)
  }

  const mailData = {
    from: config.APP_NAME,
    to: req.body.email,
    subject: 'Verification Email',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
         <br> This is our first message sent with Nodemailer<br/>`
  }

  transporter
    .sendMail(mailData)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Email has been sent'
      })
    })
    .catch(() => {
      throw new AppError('Send email has failed.', 502)
    })
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await authDb.checkUser(reqBody)
  if (!user) {
    throw new AppError('User not found', 422)
  }

  const mailData = {
    from: config.APP_NAME,
    to: req.body.email,
    subject: 'Reset Password Email',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
         <br> This is our first message sent with Nodemailer<br/>`
  }

  transporter
    .sendMail(mailData)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Email has been sent'
      })
    })
    .catch(() => {
      throw new AppError('Send email has failed.', 502)
    })
})
