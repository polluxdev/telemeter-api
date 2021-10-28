const uuid = require('../../services/uuid')
const antares = require('../../services/antares')

const Device = require('../../database/models/device')
const serialize = require('./serializer')

const createDevice = async (reqBody) => {
  let name = uuid()
  if (reqBody.hasOwnProperty('name')) {
    name = reqBody.name
  }

  return await Device.create({ name })
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

const getDevices = async (query) => {
  return await Device.paginate({}, query).then(serialize)
}

const getDevice = async (deviceID) => {
  return await Device.findById(deviceID)
    .then(async (device) => {
      const response = await antares.get(`/${device.name}/la`, {
        headers: {
          'Content-Type': 'application/json;ty=4'
        }
      })
      const meter = response.data['m2m:cin']

      if (meter) {
        const data = await updateDevice(device._id, { batteryStat: meter })
        return data
      }

      return device
    })
    .then(serialize)
}

const updateDevice = async (deviceID, reqBody) => {
  return await Device.findByIdAndUpdate(deviceID, reqBody, {
    new: true,
    runValidators: true
  }).then(serialize)
}

const deleteDevice = async (deviceID) => {
  return await Device.findByIdAndUpdate(
    deviceID,
    {
      deletedAt: Date.now()
    },
    {
      new: true,
      runValidators: true
    }
  ).then(serialize)
}

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  deleteDevice
}
