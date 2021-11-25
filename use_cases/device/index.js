const i18n = require('i18n')

const uuid = require('../../services/uuid')
const antares = require('../../services/antares')
const { deviceCode } = require('../../services/generator')

const Device = require('../../database/models/device')
const serialize = require('./serializer')
const AppError = require('../../utils/appError')

const createDevice = async (reqBody) => {
  let name = uuid()
  if (reqBody.hasOwnProperty('name')) {
    name = reqBody.name
  }

  const data = await antares.post(
    '/',
    {
      'm2m:cnt': {
        rn: name
      }
    },
    {
      headers: {
        'Content-Type': 'application/json;ty=3'
      }
    }
  )

  const code = deviceCode(data.data['m2m:cnt'], 'ri')

  return await Device.create({ name, code })
}

const getDevices = async (queryString) => {
  const { page = 1, limit = 5, ...fields } = queryString
  const query = Object.create({})
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      query[property] = fields[property]
    }
  }

  const customLabels = {
    totalDocs: 'totalCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage'
  }

  return await Device.paginate(query, { page, limit, customLabels }).then(
    serialize
  )
}

const getDevice = async (deviceID) => {
  return await Device.findById(deviceID).then(async (device) => {
    await antares
      .get(`/${device.name}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(() => {
        throw new AppError(i18n.__('error.device.not_found_antares'), 422)
      })

    return device
  })
}

const updateDevice = async (deviceID, reqBody) => {
  return await Device.findByIdAndUpdate(deviceID, reqBody, {
    new: true,
    runValidators: true
  })
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
  )
}

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice
}
