const crypto = require('crypto')

const randomString = (bytes) => crypto.randomBytes(bytes).toString('hex')

module.exports = {
  randomString
}
