const {
  registration,
  login,
  logout,
} = require('../services/authService')

const {
  findUserInfo,
  updateUserSubscription,
  seveAvatar,
  verify,
  missedVerify,
  missedPassword,
} = require('../services/userService')

const {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require('../helpers/errors')

const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body

  const newUser = await registration(email, password, subscription)

  if (!newUser) {
    throw new ConflictError('Email in use')
  }

  res
    .status(201)
    .json({
      status: 'success',
      user: { email: newUser.email, subscription: newUser.subscription },
    })
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  const data = await login(email, password)

  if (!data) {
    throw new UnauthorizedError('Email or password is wrong')
  }

  if (data === 'unconfirmed') {
    throw new UnauthorizedError('Unconfirm email. Please, confirm your email')
  }

  res.status(200).json({
    status: 'success', token: data.token, user: { email, subscription: data.subscription }
  })
}

const logoutControler = async (req, res) => {
  const { _id: id } = req.user

  await logout(id)

  res.status(204).json({ status: 'No Content' })
}

const getCurrentUserInfo = async (req, res) => {
  const { _id: id } = req.user

  const userInfo = await findUserInfo(id)
  const { email, subscription } = userInfo

  res.status(200).json({ status: 'success', email, subscription })
}

const patchUserSubscription = async (req, res) => {
  const body = req.body
  const { _id: id } = req.user

  const data = await updateUserSubscription(id, body)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const uploadFileController = async (req, res) => {
  if (!req.file) {
    throw new NotFoundError('Bad Request')
  }
  const { _id: id } = req.user

  const avatarURL = await seveAvatar(id, req.file)

  res.status(200).json({
    status: 'success',
    avatarURL,
  })
}

const verifyController = async (req, res) => {
  const { verificationToken } = req.params
  const result = await verify(verificationToken)

  if (!result) {
    throw new NotFoundError('User not found')
  }

  res.status(200).json({ status: 'success', message: 'Verification successful' })
}

const missedVerifyController = async (req, res) => {
  const { email } = req.body

  await missedVerify(email)

  res
    .status(200)
    .json({ status: 'success', message: 'Verification email sent' })
}

const missedPasswordController = async (req, res) => {
  const { email } = req.body

  await missedPassword(email)

  res
    .status(200)
    .json({
      status: 'success',
      message: 'New password has been sent to your email',
    })
}

module.exports = {
  registrationController,
  loginController,
  logoutControler,
  getCurrentUserInfo,
  patchUserSubscription,
  uploadFileController,
  verifyController,
  missedVerifyController,
  missedPasswordController,
}
