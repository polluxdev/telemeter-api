const crypto = require('crypto')

const randomString = (bytes) => crypto.randomBytes(bytes).toString('hex')
const deviceCode = (data, id) => {
  const str = data[id].split('/')

  return str[2]
}

module.exports = {
  randomString,
  deviceCode
}
