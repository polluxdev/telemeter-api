const Device = require('../models/device')

const antares = require('../../services/antares')
const { deviceCode } = require('../../services/generator')

const deviceSeed = async () => {
  let name = 'device-seed'
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

  return await Device.create({ name, code, active: true })
}

module.exports = deviceSeed
