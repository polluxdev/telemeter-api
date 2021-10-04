const fs = require('fs')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const hpp = require('hpp')
const xss = require('xss-clean')
const helmet = require('helmet')

const config = require('./config')
const routes = require('./routes')

const app = express()
const port = config.PORT || 3000;
const apiVersion = config.API_VERSION;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
)

app.use(morgan('combined', { stream: accessLogStream }))
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(helmet())

app.use(xss())

app.use(hpp())

app.use(
  cors({
    credentials: true,
    origin: true
  })
)

app.options('*', cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) =>
  res.status(200).json({
    success: true,
    message: '환영합니다! 안녕하십니까?'
  })
)

app.use(apiVersion, routes)

app.use((err, req, res, next) => {
  if (err) {
    console.error(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message
    })
  }

  next()
})

app.use(function (req, res) {
  res.status(404).json({
    status: 'Page does not exist'
  })
})

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`)
})
