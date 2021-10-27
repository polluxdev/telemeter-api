const { generateToken } = require('../../services/auth')

const _serializeSingle = (auth) => {
  const token = generateToken(auth._id, auth.email)

  return {
    id: auth._id,
    token
  }
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
