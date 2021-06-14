
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

const getContactList = async (req, res, next) => {
  try {
    const data = await listContacts()
    return res.json({ data, status: 'success' })
  } catch (err) {
    console.log(err.message)
  }
}

const getContact = async (req, res) => {
  const { contactId } = req.params
  const id = Number(contactId)
  try {
    const data = await getContactById(id)
    if (data) {
      return res.status(200).json({ data, status: 'success' })
    }
    return res.status(404).json({ message: 'Not found' })
  } catch (err) {
    console.log(err.message)
  }
}

const postContact = async (req, res) => {
  try {
    const data = await addContact(req.body)
    return res.status(201).json({ data, status: 'success' })
  } catch (err) {
    console.log(err.message)
  }
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const id = Number(contactId)
  try {
    const data = await removeContact(id)
    if (data) {
      return res.status(200).json({ data, status: 'success' })
    }
    return res.status(404).json({ message: 'Not found' })
  } catch (err) {
    console.log(err.message)
  }
}

const patchContact = async (req, res) => {
  const { contactId } = req.params
  const id = Number(contactId)
  try {
    const data = await updateContact(id, req.body)
    if (data) {
      return res.status(200).json({ data, status: 'success' })
    }
    return res.status(404).json({ message: 'Not found' })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  getContactList,
  getContact,
  postContact,
  deleteContact,
  patchContact,
}
