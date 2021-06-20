const express = require('express')
const router = express.Router()
const {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact,
  patchStatusContact
} = require('../../controllers/contactsController')

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require('../../middlewares/validation')

const { asyncWrapper } = require('../../helpers/apiHelpers')

router.get('/', asyncWrapper(getContactList))

router.get('/:contactId', asyncWrapper(getContact))

router.post('/', validationCreateContact, asyncWrapper(postContact))

router.delete('/:contactId', asyncWrapper(deleteContact))

router.patch('/:contactId', validationUpdateContact, asyncWrapper(patchContact))

router.patch(
  '/:contactId/favorite',
  validationUpdateStatusContact,
  asyncWrapper(patchStatusContact),
)

module.exports = router
