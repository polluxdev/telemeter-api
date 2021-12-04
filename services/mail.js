const i18n = require('i18n')
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

const setEmailVerification = (reqBody) => {
  const mailData = {
    from: config.APP_NAME,
    to: reqBody.email,
    subject: 'Verification Code',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
         <br>This is your confirmation code<br/>
         <b>${reqBody.confirmationCode}</b>`
  }

  return mailData
}

const setEmailForgotPassword = (reqBody) => {
  const mailData = {
    from: config.APP_NAME,
    to: reqBody.email,
    subject: 'Verification Code',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
         <br>This is your confirmation code<br/>
         <b>${reqBody.confirmationCode}</b>`
  }

  return mailData
}

const sendEmail = async (setEmail) => {
  await transporter.sendMail(setEmail)

  const response = {
    success: true,
    message: i18n.__('success.email.send_success')
  }

  return response
}

module.exports = {
  setEmailVerification,
  setEmailForgotPassword,
  sendEmail
}
