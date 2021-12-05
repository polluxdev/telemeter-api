const User = require('../models/user')

const userSeed = async () => {
  const superAdmin = {
    email: 'super@super.com',
    password: 'supersuper',
    name: 'Super Admin',
    phoneNumber: '082109871234',
    role: 'super',
    active: true
  }

  const admin = {
    email: 'admin@admin.com',
    password: 'adminadmin',
    name: 'Admin',
    phoneNumber: '082110293847',
    role: 'admin',
    active: true
  }

  const user = {
    email: 'user@user.com',
    password: 'useruser',
    name: 'User',
    phoneNumber: '082112098734',
    role: 'user',
    active: true
  }

  const ilham = {
    email: 'ilhamisthegod@gmail.com',
    password: 'ilhamisthegod',
    name: 'Ilham is The God',
    phoneNumber: '082166666666',
    role: 'admin',
    active: true
  }

  const kurniawan = {
    email: 'ilhamkurniawan@gmail.com',
    password: 'ilhamkurniawan',
    name: 'Ilham Kurniawan',
    phoneNumber: '082169696969',
    role: 'user',
    active: true
  }

  const brando = {
    email: 'brandowindah@gmail.com',
    password: 'brandowindah',
    name: 'Brando Windah',
    phoneNumber: '082169696666',
    role: 'admin',
    active: true
  }

  const windah = {
    email: 'windahbasudara@gmail.com',
    password: 'windahbasudara',
    name: 'Windah Basudara',
    phoneNumber: '082166666969',
    role: 'user',
    active: true
  }

  await User.create(superAdmin)
  await User.create(admin)
  await User.create(user)
  await User.create(ilham)
  await User.create(kurniawan)
  await User.create(brando)
  await User.create(windah)
}

module.exports = userSeed
