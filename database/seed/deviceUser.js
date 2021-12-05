const Device = require('../models/device')
const User = require('../models/user')

const deviceUserSeed = async () => {
  const users = await User.find({ role: 'user' })
  const devices = await Device.find()

  await Device.findByIdAndUpdate(devices[0].id, {
    user: users[0].id
  }).then(async (device) => {
    return await User.findByIdAndUpdate(users[0].id, { device: device.id })
  })

  await Device.findByIdAndUpdate(devices[1].id, {
    user: users[1].id
  }).then(async (device) => {
    return await User.findByIdAndUpdate(users[1].id, { device: device.id })
  })

  await Device.findByIdAndUpdate(devices[2].id, {
    user: users[2].id
  }).then(async (device) => {
    return await User.findByIdAndUpdate(users[2].id, { device: device.id })
  })
}

module.exports = deviceUserSeed
