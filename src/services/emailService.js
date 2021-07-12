const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

const { ServiceUnavailable } = require('../helpers/errors')
const { EMAIL_HOST, EMAIL_HOST_PORT, EMAIL_HOST_NAME, EMAIL_PASSWORD, SERVER_NAME, PORT } =
  process.env

const sendVerifyEmail = async (verifyToken, email) => {
  const emailBody = createVerifyTemplate(verifyToken, email)

  const config = createConfigForEmail()

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

const createVerifyTemplate = (verifyToken, email) => {
  const userName = getUserNameByEmail(email)
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: `${SERVER_NAME}:${PORT}`,
    },
  })
  const template = {
    body: {
      name: userName,
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

const sendPasswordEmail = async (password, email) => {
  const emailBody = createPasswordTemplate(password, email)

  const config = createConfigForEmail()

  const transporter = nodemailer.createTransport(config)
  const emailOptions = {
    from: EMAIL_HOST_NAME,
    to: email,
    subject: 'Your new password',
    html: emailBody,
  }
  try {
    const sender = await transporter.sendMail(emailOptions)
    console.log(sender)
  } catch (error) {
    throw new ServiceUnavailable(error.message)
  }
}

const createPasswordTemplate = (password, email) => {
  const userName = getUserNameByEmail(email)
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: `${SERVER_NAME}:${PORT}`,
    },
  })
  const template = {
    body: {
      name: userName,
      intro:
        'Welcome to System Contacts! You have requested a new password to access your account.',
      action: {
        instructions: `Your new password: ${password}`,
        button: false,
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  const emailBody = mailGenerator.generate(template)

  return emailBody
}

const getUserNameByEmail = (email) => {
  const name = email.split('@')[0]
  const capitalizedName = capitalizeFirstLetter(name)

  return capitalizedName
}

const capitalizeFirstLetter = name => name[0].toUpperCase() + name.slice(1)

const createConfigForEmail = () => {
  return {
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
}

module.exports = { sendVerifyEmail, sendPasswordEmail }
