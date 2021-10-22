const _serializeSingle = (device) => {
  return {
    id: device._id,
    name: device.name,
    batteryStat: device.batteryStat,
    active: device.active
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
