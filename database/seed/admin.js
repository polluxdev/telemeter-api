const mongoose = require('../connection')
const User = require('../models/user')

const seedDatabase = async function () {
  const root = {
    email: 'root@root.com',
    password: 'rootadmin',
    name: 'Root',
    role: 'super'
  }

  await User.create(root)
}

mongoose.connection.collections.users.drop(async function () {
  await seedDatabase()
  mongoose.connection.close()
})
