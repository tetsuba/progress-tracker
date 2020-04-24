const fs = require('fs')
const nodemailer = require('nodemailer')

let baseUrl = ''
if (process.env.REACT_APP_NODE_ENV !== 'prod') {
  baseUrl = 'http://localhost:3000/'
} else {
  // TODO: Production URL
  baseUrl = ''
}

const mailOptions = {
  confirmEmail: {
    emailTemplateName: 'confirmEmailTemplate',
    pathName: 'confirm',
    subject: 'Progress tracker confirm email address.',
  },
  resetPassword: {
    emailTemplateName: 'resetPasswordTemplate',
    pathName: 'reset',
    subject: 'Progress tracker password reset request.',
  },
}

function getEmailMailOptions(name) {
  const option = mailOptions[name]
  const path = __dirname + `/template/${option.emailTemplateName}.html`
  const fsOptions = { encoding: 'utf-8' }
  const url = `${baseUrl}${option.pathName}/{{token}}`
  const html = fs.readFileSync(path, fsOptions)
  return {
    html: html.replace('{{href}}', url),
    subject: option.subject,
  }
}

async function sendMail(token, { html, subject }) {
  const transporter = nodemailer.createTransport({
    service: process.env.REACT_APP_NODE_MAIL_SERVICE,
    auth: {
      user: process.env.REACT_APP_NODE_MAIL_ADDRESS,
      pass: process.env.REACT_APP_NODE_MAIL_ADDRESS_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.REACT_APP_NODE_MAIL_ADDRESS,
    to: 'tetsubalimited@gmail.com',
    subject: subject,
    html: html.replace('{{token}}', token),
  }

  try {
    return await transporter.sendMail(mailOptions)
  } catch (e) {
    return e
  }
}

module.exports = {
  sendMail,
  getEmailMailOptions,
}
