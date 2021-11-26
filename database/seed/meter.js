const Device = require('../models/device')
const Meter = require('../models/meter')
const User = require('../models/user')

const vs = ['ON', 'OFF']
const bs = ['OK', 'ERR']

const meterSeed = async () => {
  const device = await Device.findOne()
  const user = await User.findOne({ role: 'user' })

  const meters = []

  let n = 0

  while (n < 20) {
    meters.push({
      device: device.id,
      user: user.id,
      valveStat: getRandomStat(vs),
      batteryStat: getRandomStat(bs),
      waterUsage: getRandomInt(100),
      currentTemperature: getRandomInt(30),
      currentHumidity: getRandomInt(100)
    })

    n++
  }

  return await Meter.insertMany(meters)
}

function getRandomInt(max) {
  return (Math.random() * max).toFixed(2)
}

function getRandomStat(item) {
  return item[Math.floor(Math.random() * item.length)]
}

module.exports = meterSeed
