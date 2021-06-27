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
  const { page = 1, limit, favorite = null } = req.query
  const id = req.user._id
  const data = await listContacts(id, page, limit, favorite)

  res.json({ data, status: 'success' })
}

const getContact = async (req, res) => {
  const { contactId } = req.params
  const userId = req.user._id

  const data = await getContactById(contactId, userId)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const postContact = async (req, res) => {
  const data = await addContact({ ...req.body, owner: req.user._id })
  res.status(201).json({ data, status: 'success' })
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const userId = req.user._id

  const data = await removeContact(contactId, userId)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const patchContact = async (req, res) => {
  const { contactId } = req.params
  const body = req.body
  const userId = req.user._id

  const data = await updateContact(contactId, body, userId)
  if (!data) {
    throw new NotFoundError('Not found')
  }
  return res.status(200).json({ data, status: 'success' })
}

const patchStatusContact = async (req, res) => {
  const { contactId } = req.params
  const body = req.body
  const userId = req.user._id

  if (!body) {
    throw new ValidationError('missing field favorite')
  }

  const data = await updateStatusContact(contactId, body, userId)
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
