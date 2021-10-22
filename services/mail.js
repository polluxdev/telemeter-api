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
  const url = `${config.DOMAIN_APP}/register?key=${reqBody.confirmationCode}`
  const mailData = {
    from: config.APP_NAME,
    to: reqBody.email,
    subject: 'Verification Email',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
         <br> This is our first message sent with Nodemailer<br/>
         <a href="${url}">link</a>`
  }

  return transporter.sendMail(mailData)
}

const setEmailForgotPassword = (reqBody) => {
  const url = `${config.DOMAIN_APP}/reset-password?key=${reqBody.confirmationCode}`
  const mailData = {
    from: config.APP_NAME,
    to: reqBody.email,
    subject: 'Reset Password Email',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
         <br> This is our first message sent with Nodemailer<br/>
         <a href="${url}">link</a>`
  }

  return transporter.sendMail(mailData)
}

module.exports = {
  setEmailVerification,
  setEmailForgotPassword
}
