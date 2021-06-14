const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts()
    return res.json({ data, status: 'success' })
  } catch (err) {
    console.log(err.message)
  }
  next()
})

router.get('/:contactId', async (req, res, next) => {
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
  next()
})

router.post('/', async (req, res, next) => {
  try {
    const data = await addContact(req.body)
    return res.status(201).json({ data, status: 'success' })
  } catch (err) {
    console.log(err.message)
  }
  next()
})

router.delete('/:contactId', async (req, res, next) => {
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
  next()
})

router.patch('/:contactId', async (req, res, next) => {
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
  next()
})

module.exports = router
