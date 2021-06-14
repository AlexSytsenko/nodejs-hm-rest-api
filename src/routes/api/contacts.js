const express = require('express')
const router = express.Router()
const {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact
} = require('../../controllers/contactsController')

const {
  validationCreateContact,
  validationUpdateContact,
} = require('../../middlewares/validation')

router.get('/', getContactList)

router.get('/:contactId', getContact)

router.post('/', validationCreateContact, postContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId', validationUpdateContact, patchContact)

module.exports = router
