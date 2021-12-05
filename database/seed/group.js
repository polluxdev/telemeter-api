const Group = require('../models/group')

const { randomString } = require('../../services/generator')

const groupSeed = async () => {
  const groups = [
    {
      regionName: 'DIY',
      regionCode: randomString(3),
      active: true
    },
    {
      regionName: 'Jatim',
      regionCode: randomString(3),
      active: true
    },
    {
      regionName: 'Bali',
      regionCode: randomString(3),
      active: true
    }
  ]

  return await Group.insertMany(groups)
}

module.exports = groupSeed
