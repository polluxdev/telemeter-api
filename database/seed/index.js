const mongoose = require('../connection')
const User = require('../models/user')

const seedDatabase = async function () {
  const users = [
    {
      email: 'super@admin.com',
      password: 'superadmin',
      name: 'Super Admin',
      role: 'super',
      active: true
    },
    {
      email: 'admin@admin.com',
      password: 'adminadmin',
      name: 'Admin',
      role: 'admin',
      active: true
    },
    {
      email: 'user@user.com',
      password: 'useruser',
      name: 'User',
      role: 'user',
      active: true
    }
  ]

  await User.insertMany(users)
}

const seedDB = async () => {
  await User.deleteMany({})
  await seedDatabase()
}

seedDB().then(() => {
  mongoose.connection.close()
})
