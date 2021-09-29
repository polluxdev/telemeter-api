const generateToken = require('../../../security/token/generate')

const _serializeSingle = (auth) => {
  const token = generateToken(auth._id, auth.email)

  return {
    id: auth._id,
    email: auth.email,
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
