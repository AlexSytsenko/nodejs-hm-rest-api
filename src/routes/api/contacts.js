const express = require('express')
const router = express.Router()
const {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact,
  patchStatusContact,
} = require('../../controllers/contactsController')

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../middlewares/validation')

const { asyncWrapper } = require('../../helpers/apiHelpers')

const { checkObjectId } = require('../../middlewares/validationId')

router.get('/', asyncWrapper(getContactList))

router.get('/:contactId', checkObjectId, asyncWrapper(getContact))

router.post('/', validationCreateContact, asyncWrapper(postContact))

router.delete('/:contactId', checkObjectId, asyncWrapper(deleteContact))

router.patch(
  '/:contactId',
  checkObjectId,
  validationUpdateContact,
  asyncWrapper(patchContact),
)

router.patch(
  '/:contactId/favorite',
  checkObjectId,
  validationUpdateStatusContact,
  asyncWrapper(patchStatusContact),
)

module.exports = router
