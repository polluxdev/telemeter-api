const _serializeSingle = (user) => {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    phoneNumber: user.phoneNumber,
    device: user.device,
    role: user.role,
    group: user.group,
    active: user.active
  }
}

const serializer = (data) => {
  if (!data) {
    return null
  }

  if (data.hasOwnProperty('docs')) {
    data.docs = data.docs.map(_serializeSingle)
    return data
  }

  return _serializeSingle(data)
}

module.exports = serializer
