const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const { User } = require('../../model/db/userModel')
const { sendVerifyEmail } = require('./emailService')

const registration = async (email, password, subscription) => {
  const userIsExist = await User.findOne({ email })

  if (userIsExist) {
    return null
  }
  const verifyToken = uuidv4()

  await sendVerifyEmail(verifyToken, email)

  const user = new User({
    email,
    password,
    subscription,
    verifyToken,
  })

  const newUser = await user.save()

  return newUser
}

const login = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null
  }

  if (!user.isVerify) {
    return 'unconfirmed'
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

const logout = async id => {
  await User.findByIdAndUpdate(id, { token: null })
}

module.exports = {
  registration,
  login,
  logout,
}
