let { userValidator } = require('./joi')

let validator = {
  userValidator: (payload) => userValidator(payload)
}

module.exports = validator
