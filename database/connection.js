const i18n = require('i18n')
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
      console.log(i18n.__('success.database.connected'))
    })
    .catch(() => {
      console.error(i18n.__('success.database.failed_connect'))
    })
} else {
  mongoose
    .connect(atlasUri, options)
    .then(() => {
      console.log(i18n.__('error.database.connected_atlas'))
    })
    .catch(() => {
      console.error(i18n.__('error.database.failed_connect_atlas'))
    })
}

mongoose.connection
  .once('open', function () {
    console.log(i18n.__('success.database.open'))
  })
  .on('error', function (error) {
    console.log(i18n.__('error.database.connect_error'), error)
  })
  .on('disconnected', function () {
    console.log(i18n.__('error.database.disconnected'))
  })

module.exports = mongoose
