const { generateToken } = require('../../services/auth')

const _serializeSingle = (auth) => {
  const token = generateToken(auth._id, auth.email)

  const response = {
    id: auth._id,
    token,
    role: auth.role
  }

  if (auth.group) {
    response['group'] = {
      id: auth.group.id,
      regionName: auth.group.regionName,
      regionCode: auth.group.regionCode,
      active: auth.group.active
    }
  }

  if (auth.device) {
    response['device'] = {
      id: auth.device.id,
      code: auth.device.code,
      name: auth.device.name,
      active: auth.device.active
    }
  }

  return response
}

const _serializeLink = (auth) => {
  return {
    id: auth._id,
    key: auth.confirmationCode
  }
}

const serializer = (data) => {
  if (!data) {
    return null
  }

  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }

  if (data.confirmationCode) {
    return _serializeLink(data)
  }

  return _serializeSingle(data)
}

module.exports = serializer
