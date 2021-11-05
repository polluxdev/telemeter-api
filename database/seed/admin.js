const mongoose = require('../connection')
const User = require('../models/user')

const seedDatabase = async function () {
  const root = {
    email: 'super@admin.com',
    password: 'superadmin',
    name: 'Super Admin',
    role: 'super',
    active: true
  }

  await User.create(root)
}

mongoose.connection.collections.users.drop(async function () {
  await seedDatabase()
  mongoose.connection.close()
})
