let buildMakeUser = require('./user')
let { userValidator } = require('../../validator')

let makeUser = buildMakeUser(userValidator)

module.exports = makeUser
