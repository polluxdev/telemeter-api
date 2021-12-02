const Device = require('../models/device')
const Group = require('../models/group')
const User = require('../models/user')

const antares = require('../../services/antares')
const { deviceCode } = require('../../services/generator')

const deviceSeed = async () => {
  const group = await Group.findOne()
  const admin = await User.findOne({ role: 'admin' })

  let name = 'device-seed-dev'
  const data = await antares.post(
    '/',
    {
      'm2m:cnt': {
        rn: name
      }
    },
    {
      headers: {
        'Content-Type': 'application/json;ty=3'
      }
    }
  )

  const code = deviceCode(data.data['m2m:cnt'], 'ri')

  return await Device.create({
    name,
    code,
    admin: admin.id,
    group: group.id,
    active: true
  })
}

module.exports = deviceSeed
