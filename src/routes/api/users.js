const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutControler,
  getCurrentUserInfo,
} = require('../../controllers/usersController')

const { validationUser } = require('../../middlewares/validationUser')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/signup', validationUser, asyncWrapper(registrationController))

router.get('/login', validationUser, asyncWrapper(loginController))

router.post('/logout', authMiddleware, asyncWrapper(logoutControler))

router.get('/current', authMiddleware, asyncWrapper(getCurrentUserInfo))

module.exports = router
