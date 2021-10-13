const fs = require('fs')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const hpp = require('hpp')
const xss = require('xss-clean')
const helmet = require('helmet')
const i18n = require('i18n')
const cookieParser = require('cookie-parser')

const config = require('./config')
const routes = require('./routes')
const globalErrorHandler = require('./utils/globalError')
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

app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`)
})
