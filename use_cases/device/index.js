const uuid = require('../../services/uuid')
const axios = require('../../services/antaresService')

const serialize = require('./serializer')

const createDevice = async () => {
  const deviceID = uuid()

  return await axios
    .post('/', {
      'm2m:cnt': {
        'xmlns:m2m': 'http://www.onem2m.org/xml/protocols',
        rn: deviceID
      }
    })
    .then(serialize)
}

const getDevice = async (deviceID) => {
  return await axios.get(`/${deviceID}`).then(serialize)
}

module.exports = {
  createDevice,
  getDevice
}
