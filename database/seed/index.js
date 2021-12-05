const mongoose = require('../connection')

const deviceSeed = require('./device')
const groupSeed = require('./group')
const meterSeed = require('./meter')
const userSeed = require('./user')
const deviceUserSeed = require('./deviceUser')
const groupUserSeed = require('./groupUser')

const seedDatabase = async function () {
  await groupSeed()
  await userSeed()
}

const updateSeed = async function () {
  await groupUserSeed()
  await deviceSeed()
  await deviceUserSeed()
  await meterSeed()
}

const seedDB = async () => {
  await mongoose.connection.dropDatabase()
  await seedDatabase()
  await updateSeed()
}

seedDB().then(() => {
  mongoose.connection.close()
})
