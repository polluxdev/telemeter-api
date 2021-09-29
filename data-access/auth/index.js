const { signup, login } = require('./mongodb/index')

const authDb = {
  signup,
  login
}

module.exports = authDb
