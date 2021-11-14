const _serializeSingle = (user) => {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    phoneNumber: user.phoneNumber,
    device: user.device,
    role: user.role,
    groups: user.groups,
    active: user.active,
    confirmationCode: user.confirmationCode
  }
}

const serializer = (data) => {
  if (!data) {
    return null
  }

  if (data.hasOwnProperty('data')) {
    data.data = data.data.map(_serializeSingle)
    return data
  }

  return _serializeSingle(data)
}

module.exports = serializer
