const User = require('../models/user')

const userSeed = async () => {
  const superAdmin = {
    email: 'super@admin.com',
    password: 'superadmin',
    name: 'Super Admin',
    role: 'super',
    active: true
  }

  const admin = {
    email: 'admin@admin.com',
    password: 'adminadmin',
    name: 'Admin',
    role: 'admin',
    active: true
  }

  const user = {
    email: 'user@user.com',
    password: 'useruser',
    name: 'User',
    role: 'user',
    active: true
  }

  await User.create(superAdmin)
  await User.create(admin)
  await User.create(user)
}

module.exports = userSeed
