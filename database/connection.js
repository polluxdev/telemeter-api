const mongoose = require('mongoose')

const config = require('../config')

mongoose.Promise = global.Promise

const atlasUri = `${config.mongo.MONGO_ATLAS_URI}`
const localUri = `${config.mongo.MONGO_LOCAL_URI}/${config.mongo.MONGO_DB_NAME}`
// const localUri = `${config.mongo.MONGO_DOCKER_URI}`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

if (config.NODE_ENV === 'development') {
  mongoose
    .connect(localUri, options)
    .then(() => {
      console.log('CONNECTED TO MONGODB!')
    })
    .catch(() => {
      console.error('FAILED TO CONNECT TO MONGODB!')
    })
} else {
  mongoose
    .connect(atlasUri, options)
    .then(() => {
      console.log('CONNECTED TO MONGODB!')
    })
    .catch(() => {
      console.error('FAILED TO CONNECT TO MONGODB!')
    })
}

mongoose.connection
  .once('open', function () {
    console.log('Connection has been made')
  })
  .on('error', function (error) {
    console.log('Connect error', error)
  })
  .on('disconnected', function () {
    console.log('Connection disconnected')
  })

module.exports = mongoose
