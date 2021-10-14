const fs = require('fs')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const hpp = require('hpp')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const i18n = require('i18n')
const cookieParser = require('cookie-parser')

const config = require('./config')
const routes = require('./routes')
const AppError = require('./utils/appError')

const app = express()
const port = config.PORT || 3000
const apiVersion = config.API_VERSION

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
)

i18n.configure({
  locales: ['en', 'id'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  cookie: 'lang',
  autoReload: true,
  updateFiles: true,
  objectNotation: true,
  register: global
})

app.use(i18n.init)

const limiter = rateLimit({
  max: config.MAX_RATE_LIMIT || 1000,
  windowMs: config.RESET_RATE_INTERVAL || 60 * 60 * 1000,
  message: i18n.__('general.too_many_request')
})

app.use(apiVersion, limiter)

app.use('/public/images', express.static(path.join(__dirname, 'images')))

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
app.use(cookieParser())
app.use(mongoSanitize())

app.use((req, res, next) => {
  if (req.cookies.lang) {
    i18n.setLocale(req.cookies.lang)
  } else {
    i18n.setLocale('en')
  }

  next()
})

app.post('/switch', (req, res, next) => {
  i18n.setLocale(req.query.lang)
  res.cookie('lang', req.query.lang, { maxAge: 60000, httpOnly: true })
  res.status(200).json({
    status: 'success',
    message: i18n.__('general.switch_locale_message')
  })
})

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: i18n.__('index')
  })
})

app.use(apiVersion, routes)

app.all('*', (req, res, next) => {
  const error = new AppError(
    i18n.__('error.url_not_found', req.originalUrl),
    404
  )
  next(error)
})

app.use((err, req, res, next) => {
  if (err) {
    console.error(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }

    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  })
})

const server = app.listen(port, () => {
  console.log(i18n.__('general.server_running', port))
})

process.on(i18n.__('error.server.unhandle_rejection_name'), (error) => {
  console.log(i18n.__('error.server.unhandle_rejection_message'))
  console.log(error)

  server.close(() => {
    process.exit(1)
  })
})

process.on(i18n.__('error.server.uncaught_exception_name'), (error) => {
  console.log(i18n.__('error.server.uncaught_exception_message'))
  console.log(error.name, error.message)

  server.close(() => {
    process.exit(1)
  })
})
