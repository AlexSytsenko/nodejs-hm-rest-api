const jimp = require('jimp')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../model/db/userModel')
const PORT = process.env.PORT
const { NotFoundError, ValidationError } = require('../helpers/errors')
const { sendEmail } = require('./emailService')

const findUserInfo = async id => {
  const user = await User.findById(id)

  return user
}

const updateUserSubscription = async (id, body) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true },
  ).select({ email: 1, subscription: 1 })
  return user
}

const seveAvatar = async (id, file) => {
  const img = await jimp.read(file.path)
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(file.path)

  await fs.rename(file.path, path.join('./public/avatars', file.filename))

  const url = `localhost:${PORT}/api/avatars/${file.filename}`

  await User.findByIdAndUpdate(
    id,
    {
      avatar: url,
    },
  )

  return url
}

const verify = async (token) => {
  const user = await User.findOne({ verifyToken: token })

  if (!user) {
    return false
  }
  await user.updateOne({ isVerify: true, verifyToken: null })
  return true
}

const missedVerify = async (email) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  if (user.isVerify) {
    throw new ValidationError('Verification has already been passed')
  }
  const verifyToken = uuidv4()

  await sendEmail(verifyToken, email)

  await user.updateOne({ verifyToken, })

  return true
}

module.exports = {
  findUserInfo,
  updateUserSubscription,
  seveAvatar,
  verify,
  missedVerify,
}
