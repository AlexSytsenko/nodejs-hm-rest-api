const {
  registration,
  login,
  logout,
  findUserByEmail,
} = require('../services/userService')
const { ConflictError } = require('../helpers/errors')

const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await findUserByEmail(email)

  if (user) {
    throw new ConflictError('Email in use')
  }
  const newUser = await registration(email, password, subscription)

  res
    .status(201)
    .json({
      status: 'success',
      user: { email: newUser.email, subscription: newUser.subscription },
    })
}

const loginController = async (req, res) => {}

const logoutControler = async (req, res) => {}

module.exports = {
  registrationController,
  loginController,
  logoutControler,
}
