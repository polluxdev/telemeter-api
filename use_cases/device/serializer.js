const _serializeSingle = (device) => {
  const data = device.data['m2m:cnt']
  return {
    id: data.rn
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
