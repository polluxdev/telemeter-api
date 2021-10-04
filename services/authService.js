const config = require('../config')
const jwt = require('jsonwebtoken')

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, config.jwt.JWT_SECRET_KEY, {
    expiresIn: config.jwt.JWT_EXPIRED_TIMEOUT
  })
}

module.exports = {
  generateToken
}
