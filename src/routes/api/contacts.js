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
} = require('../../middlewares/validationContact')

const { asyncWrapper } = require('../../helpers/apiHelpers')

const { checkId } = require('../../middlewares/validationId')

router.get('/', asyncWrapper(getContactList))

router.get('/:contactId', checkId, asyncWrapper(getContact))

router.post('/', validationCreateContact, asyncWrapper(postContact))

router.delete('/:contactId', checkId, asyncWrapper(deleteContact))

router.patch(
  '/:contactId',
  checkId,
  validationUpdateContact,
  asyncWrapper(patchContact),
)

router.patch(
  '/:contactId/favorite',
  checkId,
  validationUpdateStatusContact,
  asyncWrapper(patchStatusContact),
)

module.exports = router
