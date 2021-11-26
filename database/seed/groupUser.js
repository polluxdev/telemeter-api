const Group = require('../models/group')
const User = require('../models/user')

const groupUserSeed = async () => {
  const admin = await User.findOne({ role: 'admin' })
  const user = await User.findOne({ role: 'user' })

  return await Group.findOneAndUpdate({
    $push: { admin: admin.id, users: user.id }
  }).then(async (group) => {
    return await User.updateMany(
      { role: { $ne: 'super' } },
      { group: group.id }
    )
  })
}

module.exports = groupUserSeed
