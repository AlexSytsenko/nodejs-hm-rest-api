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
  if (data) {
    return res.status(200).json({ data, status: 'success' })
  }
  // res.status(404).json({ message: 'Not found' })
  throw new NotFoundError('Not found')
}

const postContact = async (req, res) => {
  const data = await addContact(req.body)
  res.status(201).json({ data, status: 'success' })
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params

  const data = await removeContact(contactId)
  if (data) {
    return res.status(200).json({ data, status: 'success' })
  }
  // res.status(404).json({ message: 'Not found' })
  throw new NotFoundError('Not found')
}

const patchContact = async (req, res) => {
  const { contactId } = req.params
  const body = req.body

  const data = await updateContact(contactId, body)
  if (data) {
    return res.status(200).json({ data, status: 'success' })
  }
  // res.status(404).json({ message: 'Not found' })
  throw new NotFoundError('Not found')
}

const patchStatusContact = async (req, res) => {
  const { contactId } = req.params
  const body = req.body

  if (!body) {
    // return res.status(400).json({ message: 'missing field favorite' })
    throw new ValidationError('missing field favorite')
  }

  const data = await updateStatusContact(contactId, body)
  if (data) {
    return res.status(200).json({ data, status: 'success' })
  }
  // res.status(404).json({ message: 'Not found' })
  throw new NotFoundError('Not found')
}

module.exports = {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact,
  patchStatusContact,
}
