const _serializeSingle = (device) => {
  return {
    id: device.id,
    name: device.name,
    qty: device.qty,
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
