const uuid = require('../../services/uuid')
const antares = require('../../services/antares')

const Device = require('../../database/models/device')
const serialize = require('./serializer')

const createDevice = async () => {
  return await Device.create({ name: uuid() })
    .then(async (device) => {
      await antares.post(
        '/',
        {
          'm2m:cnt': {
            rn: device.name
          }
        },
        {
          headers: {
            'Content-Type': 'application/json;ty=3'
          }
        }
      )
      return device
    })
    .then(serialize)
}

const getDevice = async (deviceID) => {
  return await Device.findById(deviceID)
  .then(async (device) => {
    await antares.get(
      `/${device.name}`,
    )
    return device
  }).then(serialize)
}

const deleteDevice = async (deviceID) => {
  return await Device.findByIdAndDelete(deviceID)
}

module.exports = {
  createDevice,
  getDevice,
  deleteDevice
}
