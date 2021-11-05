const _serializeSingle = (group) => {
  return {
    id: group._id,
    regionName: group.regionName,
    regionCode: group.regionCode,
    admin: group.admin,
    users: group.users,
    active: group.active
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
