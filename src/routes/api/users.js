const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutControler,
  getCurrentUserInfo,
  patchUserSubscription,
  uploadFileController,
  verifyController,
  missedVerifyController,
  missedPasswordController,
} = require('../../controllers/usersController')

const {
  validationUser,
  validationSubscription,
  validationUserEmail,
} = require('../../middlewares/validationUser')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { upload } = require('../../helpers/avatarsHandler')

router.post('/signup', validationUser, asyncWrapper(registrationController))

router.get('/login', validationUser, asyncWrapper(loginController))

router.post('/logout', authMiddleware, asyncWrapper(logoutControler))

router.get('/current', authMiddleware, asyncWrapper(getCurrentUserInfo))

router.get('/verify/:verificationToken', asyncWrapper(verifyController))

router.post(
  '/verify',
  validationUserEmail,
  asyncWrapper(missedVerifyController),
)

router.post(
  '/password',
  validationUserEmail,
  asyncWrapper(missedPasswordController),
)

// ========== imeges loader
router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  asyncWrapper(uploadFileController),
)

router.patch(
  '/',
  authMiddleware,
  validationSubscription,
  asyncWrapper(patchUserSubscription),
)

module.exports = router
