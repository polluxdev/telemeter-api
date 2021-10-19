const config = require('../config')
const jwt = require('jsonwebtoken')

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, config.jwt.JWT_SECRET_KEY, {
    expiresIn: config.jwt.JWT_EXPIRED_TIMEOUT
  })
}

const createCookie = () => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.jwt.JWT_COOKIE_EXPIRED_TIMEOUT * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  if (config.NODE_ENV === 'production') cookieOptions.secure = true

  return cookieOptions
}

module.exports = {
  generateToken,
  createCookie
}
