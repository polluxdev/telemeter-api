const Meter = require('../../database/models/meter')

const config = require('../../config')

const getMeters = async (queryString) => {
  const { page = 1, limit = config.query.QUERY_LIMIT, ...fields } = queryString
  const query = Object.create({})
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      query[property] = fields[property]
    }
  }

  const customLabels = {
    totalDocs: 'totalCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage'
  }

  return await Meter.paginate(query, { page, limit, customLabels })
}

const getMeter = async (param) => {
  return await Meter.findOne(param).sort({ createdAt: -1 })
}

module.exports = {
  getMeters,
  getMeter
}
