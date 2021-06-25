const { Contact } = require('../../model/db/contactModel')

const listContacts = async (page, limit) => {
  let data
  if (limit) {
    const result = await Contact.paginate({}, { page, limit })
    data = result.docs
  } else {
    data = await Contact.find({})
  }

  return data
}

const getContactById = async id => {
  const data = await Contact.findById(id)

  return data
}

const addContact = async body => {
  const contact = new Contact(body)
  const data = await contact.save()

  return data
}

const removeContact = async id => {
  const contact = await Contact.findByIdAndRemove(id)

  return contact
}

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true },
  )
  return contact
}

const updateStatusContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    body,
    { new: true },
  )
  return contact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
