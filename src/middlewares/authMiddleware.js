const jwt = require('jsonwebtoken')

const { User } = require('../../model/db/userModel')
const { UnauthorizedError } = require('../helpers/errors')

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers['authorization'].split(' ')

    // Чего без ретерна не работает
    if (!token) {
      next(new UnauthorizedError('Not authorized'))
      return
    }

    const user = jwt.decode(token, process.env.JWT_SECRET)

    if (!user) {
      next(new UnauthorizedError('Please, provide the valid token'))
      return
    }
    const id = user._id
    const baseUser = await User.findById(id)

    if (!baseUser || token !== baseUser.token) {
      next(new UnauthorizedError('Please, provide the valid token'))
      return
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    next(new UnauthorizedError(error.message))
  }
}

module.exports = { authMiddleware }
