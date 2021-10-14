const i18n = require('i18n')
const { v4: uuidv4 } = require('uuid')

const axios = require('../services/antaresService')
const catchAsync = require('../utils/catchAsync')
const authDb = require('../use_cases/auth')

exports.signup = catchAsync(async (req, res, next) => {
  const reqBody = req.body
  const checkUser = await authDb.checkUser(reqBody)
  if (checkUser) {
    return res.status(409).json({
      success: false,
      message: i18n.__('error.user_already_exists')
    })
  }

  const deviceID = uuidv4()
  const device = await axios.post('', {
    'm2m:cnt': {
      'xmlns:m2m': 'http://www.onem2m.org/xml/protocols',
      rn: deviceID
    }
  })

  reqBody.deviceID = deviceID
  const data = await authDb.signup(reqBody)

  const response = {
    success: true,
    data,
    device: device.data
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
