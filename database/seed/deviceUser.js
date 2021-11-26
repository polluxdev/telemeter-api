const Device = require('../models/device')
const User = require('../models/user')

const deviceUserSeed = async () => {
  const user = await User.findOne({ role: 'user' })

  return await Device.findOneAndUpdate({
    user: user.id
  }).then(async (device) => {
    return await User.findByIdAndUpdate(user.id, { device: device.id })
  })
}

module.exports = deviceUserSeed
