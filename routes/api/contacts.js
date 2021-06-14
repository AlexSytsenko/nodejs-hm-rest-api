const express = require('express')
const router = express.Router()
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require('../../model/index')

const {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact
} = require('../../src/controllers/contactsController')

const {
  validationCreateContact,
  validationUpdateContact,
} = require('../../src/middlewares/validation')

router.get('/', getContactList)

router.get('/:contactId', getContact)

router.post('/', validationCreateContact, postContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId', validationUpdateContact, patchContact)

module.exports = router
