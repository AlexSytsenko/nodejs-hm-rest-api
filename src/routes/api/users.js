const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutControler,
} = require('../../controllers/usersController')

const { validationUser } = require('../../middlewares/validationUser')

const { asyncWrapper } = require('../../helpers/apiHelpers')

router.post('/signup', validationUser, asyncWrapper(registrationController))

router.get('/login', validationUser, asyncWrapper(loginController))

router.post('/logout', asyncWrapper(logoutControler))

module.exports = router
