const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../model/db/userModel')

const registration = async (email, password, subscription) => {
  const userIsExist = await User.findOne({ email })

  if (userIsExist) {
    return null
  }

  const user = new User({
    email,
    password,
    subscription,
  })

  const newUser = await user.save()

  return newUser
}

const login = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
  )
  await User.findByIdAndUpdate(user.id, { token })

  const { subscription } = user

  return { token, subscription }
}

const logout = async body => {}

module.exports = {
  registration,
  login,
  logout,
}
