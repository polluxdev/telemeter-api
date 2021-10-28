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

  if (data.hasOwnProperty('docs')) {
    data.docs = data.docs.map(_serializeSingle)
    return data
  }

  return _serializeSingle(data)
}

module.exports = serializer
