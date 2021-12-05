const Meter = require('../models/meter')
const User = require('../models/user')

const vs = ['ON', 'OFF']
const bs = ['OK', 'ERR']

const meterSeed = async () => {
  const users = await User.find({ role: 'user' })

  const meters = []

  let i = 0
  while (i < users.length) {
    let j = 0
    while (j < 1000) {
      meters.push({
        device: users[i].device,
        user: users[i].id,
        valveStat: getRandomStat(vs),
        batteryStat: getRandomStat(bs),
        waterUsage: getRandomInt(100),
        currentTemperature: getRandomInt(30),
        currentHumidity: getRandomInt(100)
      })

      j++
    }

    i++
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
