const uuid = require('../../services/uuid')

const Device = require('../../database/models/device')
const serialize = require('./serializer')

const createDevice = async () => {
  return await Device.create({ name: uuid() }).then(serialize)
}

const getDevice = async (deviceID) => {
  return await Device.findById(deviceID).then(serialize)
}

const deleteDevice = async (deviceID) => {
  return await Device.findByIdAndDelete(deviceID)
}

module.exports = {
  createDevice,
  getDevice,
  deleteDevice
}
