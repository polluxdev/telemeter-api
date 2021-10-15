const nodemailer = require('nodemailer')

const config = require('../config')

const transporter = nodemailer.createTransport({
  port: config.mail.MAIL_PORT,
  host: config.mail.MAIL_HOST,
  auth: {
    user: config.mail.MAIL_USER,
    pass: config.mail.MAIL_PASSWORD
  },
  secure: true
})

module.exports = transporter
