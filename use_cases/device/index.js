const uuid = require('../../services/uuid')
const axios = require('../../services/antares')

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

const deleteDevice = async (deviceID) => {
  return await axios.delete(`/${deviceID}`)
}

module.exports = {
  createDevice,
  getDevice,
  deleteDevice
}
