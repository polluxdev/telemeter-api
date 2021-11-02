const crypto = require('crypto')

module.exports = () => crypto.randomBytes(48).toString('hex')
