const axios = require('axios')

const config = require('../config')

const instance = axios.create({
  baseURL: `${config.antares.ANTARES_URL}/${config.antares.ANTARES_APPLICATION_NAME}`,
  headers: {
    'X-M2M-Origin': config.antares.ANTARES_ACCESS_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

module.exports = instance
