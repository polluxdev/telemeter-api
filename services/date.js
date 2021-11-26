const moment = require('moment')

const parseDate = (date) => {
  return moment(date).format('DD-MM-YYYY hh:mm:ss')
}

module.exports = {
  parseDate
}
