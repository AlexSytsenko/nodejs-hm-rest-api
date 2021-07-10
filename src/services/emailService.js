const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

const { ServiceUnavailable } = require('../helpers/errors')
const { EMAIL_HOST, EMAIL_HOST_PORT, EMAIL_HOST_NAME, EMAIL_PASSWORD, SERVER_NAME, PORT } =
  process.env

const sendEmail = async (verifyToken, email) => {
  const emailBody = createTemplate(verifyToken)

  const config = {
    host: EMAIL_HOST,
    port: EMAIL_HOST_PORT,
    secure: true,
    auth: {
      user: EMAIL_HOST_NAME,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }

  const transporter = nodemailer.createTransport(config)
  const emailOptions = {
    from: EMAIL_HOST_NAME,
    to: email,
    subject: 'Please, verify your email',
    html: emailBody,
  }
  try {
    const sender = await transporter.sendMail(emailOptions)
    console.log(sender)
  } catch (error) {
    throw new ServiceUnavailable(error.message)
  }
}

const createTemplate = (verifyToken) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: `${SERVER_NAME}:${PORT}`,
    },
  })
  const template = {
    body: {
      intro:
        "Welcome to System Contacts! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `${SERVER_NAME}:${PORT}/api/users/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  const emailBody = mailGenerator.generate(template)

  return emailBody
}

module.exports = { sendEmail }
