const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../services/contactsService')

const { ValidationError, NotFoundError } = require('../helpers/errors')

const getContactList = async (req, res) => {
  const data = await listContacts()
  res.json({ data, status: 'success' })
}

const getContact = async (req, res) => {
  const { contactId } = req.params

  const data = await getContactById(contactId)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const postContact = async (req, res) => {
  const data = await addContact(req.body)
  res.status(201).json({ data, status: 'success' })
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params

  const data = await removeContact(contactId)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const patchContact = async (req, res) => {
  const { contactId } = req.params
  const body = req.body

  const data = await updateContact(contactId, body)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const patchStatusContact = async (req, res) => {
  const { contactId } = req.params
  const body = req.body

  if (!body) {
    throw new ValidationError('missing field favorite')
  }

  const data = await updateStatusContact(contactId, body)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

module.exports = {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact,
  patchStatusContact,
}
