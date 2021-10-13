const { generateToken } = require('../../services/authService')

const _serializeSingle = (auth) => {
  const token = generateToken(auth._id, auth.email)

  return {
    token
  }
}

const serializer = (data) => {
  if (!data) {
    return null
  }

  if (Array.isArray(data)) {
    return data.map(_serializeSingle)
  }

  return _serializeSingle(data)
}

module.exports = serializer
