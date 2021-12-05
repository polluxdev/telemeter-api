const Device = require('../models/device')
const User = require('../models/user')

const antares = require('../../services/antares')
const { deviceCode } = require('../../services/generator')
const uuid = require('../../services/uuid')

const deviceSeed = async () => {
  const admins = await User.find({ role: 'admin' })

  const devices = []

  let n = 0
  while (n < admins.length) {
    let name = uuid()
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

    devices.push({
      name,
      code,
      admin: admins[n].id,
      group: admins[n].group,
      active: true
    })

    n++
  }

  return await Device.insertMany(devices)
}

module.exports = deviceSeed
