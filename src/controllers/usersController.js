const {
  registration,
  login,
  logout,
} = require('../services/userService')
const { ConflictError, UnathorizedError } = require('../helpers/errors')

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
    throw new UnathorizedError('Email or password is wrong')
  }

  res.status(200).json({
    status: 'success', token: data.token, user: { email, subscription: data.subscription }
  })
}

const logoutControler = async (req, res) => {}

module.exports = {
  registrationController,
  loginController,
  logoutControler,
}
