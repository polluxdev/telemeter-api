const Group = require('../models/group')

const { randomString } = require('../../services/generator')

const groupSeed = async () => {
  const group = {
    regionName: 'DIY',
    regionCode: randomString(3),
    active: true
  }

  return await Group.create(group)
}

module.exports = groupSeed
