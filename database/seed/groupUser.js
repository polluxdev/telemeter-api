const Group = require('../models/group')
const User = require('../models/user')

const groupUserSeed = async () => {
  const admins = await User.find({ role: 'admin' }, '_id')
  const users = await User.find({ role: 'user' }, '_id')
  const groups = await Group.find()

  await Group.findByIdAndUpdate(groups[0].id, {
    $push: { admin: admins[0].id, users: users[0].id }
  }).then(async (group) => {
    return await User.updateMany(
      { _id: { $in: [admins[0].id, users[0].id] } },
      { group: group.id }
    )
  })

  await Group.findByIdAndUpdate(groups[1].id, {
    $push: { admin: admins[1].id, users: users[1].id }
  }).then(async (group) => {
    return await User.updateMany(
      { _id: { $in: [admins[1].id, users[1].id] } },
      { group: group.id }
    )
  })

  await Group.findByIdAndUpdate(groups[2].id, {
    $push: { admin: admins[2].id, users: users[2].id }
  }).then(async (group) => {
    return await User.updateMany(
      { _id: { $in: [admins[2].id, users[2].id] } },
      { group: group.id }
    )
  })
}

module.exports = groupUserSeed
