const { User } = require('../../model/db/userModel')

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

module.exports = {
  findUserInfo,
  updateUserSubscription,
}
