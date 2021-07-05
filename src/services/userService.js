const jimp = require('jimp')
require('dotenv').config()

const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../model/db/userModel')
const PORT = process.env.PORT

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

module.exports = {
  findUserInfo,
  updateUserSubscription,
  seveAvatar,
}
